const pool = require('../config/db');

class Comment {
  static async create({ lunchId, userId, content, profanity }) {
    const [result] = await pool.execute(
      `INSERT INTO Comments (lunch_id, user_id, content, profanity)
       VALUES (?, ?, ?, ?)`,
      [lunchId, userId, content, profanity]
    );
    return result.insertId;
  }

  static async getByLunchId(lunchId) {
    const [rows] = await pool.execute(
      `SELECT c.*, u.username as user_email
       FROM Comments c
       JOIN Users u ON c.user_id = u.id
       WHERE c.lunch_id = ?
       ORDER BY c.created_at DESC`,
      [lunchId]
    );
    return rows;
  }
}

module.exports = Comment;