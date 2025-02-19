const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
    async register(req, res) {
        try {
          const { email } = req.body;
          
          const existingUser = await User.findByEmail(email);
          if (existingUser) {
            return res.status(400).json({ error: 'Email již existuje' });
          }
      
          const userId = await User.create(email);
          const token = jwt.sign(
            { id: userId, email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
      
          res.status(201).json({ token });
        } catch (error) {
          res.status(500).json({ error: 'Chyba registrace' });
        }
      },
      
      async login(req, res) {
        try {
          const { email } = req.body;
          const user = await User.findByEmail(email);
          
          if (!user) {
            return res.status(401).json({ error: 'Uživatel neexistuje' });
          }
      
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
      
          res.json({ token });
        } catch (error) {
          res.status(500).json({ error: 'Chyba přihlášení' });
        }
        }
};