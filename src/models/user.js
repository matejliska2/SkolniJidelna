const pool = require('../config/db');

class User {
  static async create({ username }) {
    const [result] = await pool.execute(
      'INSERT INTO Users (username) VALUES (?)',
      [username]
    );
    return {
      id: result.insertId,
      username
    };
  }

  static async findByUsername(username) {
    const [rows] = await pool.execute(
      'SELECT * FROM Users WHERE username = ?',
      [username]
    );
    return rows[0];
  }
}

module.exports = User;