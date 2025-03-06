const axios = require('axios');
const User = require('../models/user');
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');
const jwt = require('jsonwebtoken');
const { URLSearchParams } = require('url');

const JIDELNA_CONFIG = {
  BASE_URL: 'https://strav.nasejidelna.cz',
  LOGIN_PATH: '/0341/login',
  LOGIN_CHECK_PATH: '/0341/j_spring_security_check',
  SUCCESS_URL: '/0341/?terminal=false'
};

const createClient = () => {
  const cookieJar = new CookieJar();
  return {
    client: wrapper(axios.create({
      baseURL: JIDELNA_CONFIG.BASE_URL,
      jar: cookieJar,
      withCredentials: true,
      maxRedirects: 0,
      validateStatus: status => status >= 200 && status < 400
    })),
    cookieJar
  };
};

const extractCsrfToken = (html) => {
  const csrfRegex = /name="_csrf" value="([^"]+)"/;
  const match = html.match(csrfRegex);
  return match ? match[1] : null;
};

const attemptJidelnaLogin = async (username, password) => {
  const { client, cookieJar } = createClient();

  try {
    const loginPage = await client.get(JIDELNA_CONFIG.LOGIN_PATH);
    const csrfToken = extractCsrfToken(loginPage.data);

    if (!csrfToken) {
      throw new Error('CSRF token not found');
    }

    const params = new URLSearchParams();
    params.append('j_username', username);
    params.append('j_password', password);
    params.append('_csrf', csrfToken);
    params.append('remember-me', 'true');

    const response = await client.post(
      JIDELNA_CONFIG.LOGIN_CHECK_PATH,
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Referer': `${JIDELNA_CONFIG.BASE_URL}${JIDELNA_CONFIG.LOGIN_PATH}`
        }
      }
    );

    const redirectLocation = response.headers.location;
    if (!redirectLocation) {
      throw new Error('No redirect location found');
    }

    const isSuccess = redirectLocation.endsWith(JIDELNA_CONFIG.SUCCESS_URL);
    return {
      success: isSuccess,
    };
  } catch (error) {
    console.error('Login error:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const loginResult = await attemptJidelnaLogin(username, password);
      if (!loginResult.success) {
        return res.status(401).json({
          error: 'Invalid credentials',
          code: 'AUTH_FAILED'
        });
      }

      let user = await User.findByUsername(username);
      if (!user) {
        user = await User.create({
          username: username
        });
      }

      const token = jwt.sign(
        {
          sub: user.id,
          username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '6h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        error: 'Login processing failed',
        code: 'LOGIN_ERROR'
      });
    }
  }
};