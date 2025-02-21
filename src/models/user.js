const pool = require('../config/db');

class User {
  static async create(email) {
    const [result] = await pool.execute(
      'INSERT INTO Users (email) VALUES (?)',
      [email]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM Users WHERE email = ?',
      [email]
    );
    return rows[0];
  }
}

module.exports = User;