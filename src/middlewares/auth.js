const jwt = require('jsonwebtoken');
const db = require('../config/db');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Přístup zamítnut' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [users] = await db.query('SELECT * FROM Users WHERE id = ?', [decoded.sub]);
    if (users.length === 0) throw new Error();
    req.user = users[0];
    next();
  } catch (error) {
    res.status(401).json({ error: 'Neplatný token' });
  }
};