const pool = require('../config/db');

class User {
  static create(username) {
    return { id: Date.now(), username };
  }

  static async findByUsername(username) {
    const [rows] = await pool.execute(
      'SELECT * FROM Users WHERE email = ?',
      [username]
    );
    return rows[0];
  }
}

module.exports = User;