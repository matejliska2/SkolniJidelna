const pool = require('../config/db');

class Review {
  static async create({ lunchId, userId, cookSoup, cookFood, cookDessert, pay, portion, temperature, look }) {
    await pool.execute(
      `INSERT INTO Reviews 
      (lunch_id, user_id, cook_soup, cook_food, cook_dessert, pay, portion, temperature, look)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [lunchId, userId, cookSoup, cookFood, cookDessert, pay, portion, temperature, look]
    );
  }

  static async hasUserReviewedLunch(userId, lunchId) {
    const [rows] = await pool.execute(
      'SELECT 1 FROM Reviews WHERE user_id = ? AND lunch_id = ? LIMIT 1',
      [userId, lunchId]
    );
    return rows.length > 0;
  }
}

module.exports = Review;