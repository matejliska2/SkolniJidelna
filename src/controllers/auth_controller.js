const axios = require('axios');
const tough = require('tough-cookie');
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');
const jwt = require('jsonwebtoken');
const { URLSearchParams } = require('url');

const JIDELNA_CONFIG = {
  BASE_URL: 'https://strav.nasejidelna.cz',
  LOGIN_PATH: '/0341/login',
  LOGIN_CHECK_PATH: '/0341/login_check',
  SUCCESS_URL: '/0341/faces/secured/main.jsp?status=true&printer=&keyboard=&terminal=false'
};

const createClient = () => {
  const cookieJar = new CookieJar();
  const client = wrapper(axios.create({
    baseURL: JIDELNA_CONFIG.BASE_URL,
    jar: cookieJar,
    withCredentials: true,
    maxRedirects: 0,
    validateStatus: (status) => status >= 200 && status < 400
  }));
  return { client, cookieJar };
};

// Extrakce CSRF tokenu
const extractCsrfToken = (html) => {
  const csrfRegex = /name="_csrf_token" value="([^"]+)"/;
  const match = html.match(csrfRegex);
  return match ? match[1] : null;
};

// Hlavní přihlašovací funkce
const attemptJidelnaLogin = async (username, password) => {
  const { client, cookieJar } = createClient();

  try {
    // 1. Získání přihlašovací stránky a CSRF tokenu
    const loginPage = await client.get(JIDELNA_CONFIG.LOGIN_PATH);
    const csrfToken = extractCsrfToken(loginPage.data);

    if (!csrfToken) {
      throw new Error('Nepodařilo se získat CSRF token');
    }

    // 2. Příprava přihlašovacích dat
    const params = new URLSearchParams();
    params.append('_username', username);
    params.append('_password', password);
    params.append('_csrf_token', csrfToken);
    params.append('_target_path', JIDELNA_CONFIG.SUCCESS_URL);

    // 3. Odeslání přihlašovacího požadavku
    const loginResponse = await client.post(
      JIDELNA_CONFIG.LOGIN_CHECK_PATH,
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Referer': `${JIDELNA_CONFIG.BASE_URL}${JIDELNA_CONFIG.LOGIN_PATH}`
        }
      }
    );

    // 4. Ověření úspěšného přihlášení
    const isSuccess = loginResponse.headers.location === JIDELNA_CONFIG.SUCCESS_URL;
    const cookies = cookieJar.getCookiesSync(JIDELNA_CONFIG.BASE_URL);

    return {
      success: isSuccess,
      cookies: cookies.map(cookie => cookie.toString())
    };
  } catch (error) {
    console.error('Chyba přihlášení:', error);
    return { success: false };
  }
};

module.exports = {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // 1. Ověření přihlašovacích údajů
      const loginResult = await attemptJidelnaLogin(username, password);
      if (!loginResult.success) {
        return res.status(401).json({ 
          error: 'Neplatné přihlašovací údaje',
          code: 'INVALID_CREDENTIALS'
        });
      }

      // 2. Vytvoření/lokálního uživatele
      let user = await User.findByEmail(username);
      if (!user) {
        user = await User.create(username);
      }

      // 3. Generování JWT tokenu
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          jidelnaCookies: loginResult.cookies
        },
        process.env.JWT_SECRET,
        { expiresIn: '6h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email
        }
      });

    } catch (error) {
      console.error('Chyba přihlášení:', error);
      res.status(500).json({ 
        error: 'Chyba přihlašovacího procesu',
        code: 'LOGIN_ERROR'
      });
    }
  },

  async validateSession(req, res) {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Vytvoření klienta s uloženými cookies
      const { client } = createClient();
      decoded.jidelnaCookies.forEach(cookie => {
        client.defaults.jar.setCookie(cookie, JIDELNA_CONFIG.BASE_URL);
      });

      // Ověření platné session
      const response = await client.get(JIDELNA_CONFIG.SUCCESS_URL);
      const isLoggedIn = response.data.includes('Odhlásit');

      res.json({ valid: isLoggedIn });
    } catch (error) {
      res.json({ valid: false });
    }
  }
};