const pool = require('../config/db');

class Review {
  static async create({ lunchId, userId, cookSoup, cookFood, cookDessert, pay, portion_size, temperature, look }) {
    await pool.execute(
      `INSERT INTO Reviews 
      (lunch_id, user_id, cook_soup, cook_food, cook_dessert, pay, portion_size, temperature, look)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [lunchId, userId, cookSoup, cookFood, cookDessert, pay, portion_size, temperature, look]
    );
  }

  static async hasUserReviewedLunch(userId, lunchId) {
    const [rows] = await pool.execute(
      'SELECT 1 FROM Reviews WHERE user_id = ? AND lunch_id = ? LIMIT 1',
      [userId, lunchId]
    );
    return rows.length > 0;
  }

  static async getByLunchId(lunchId) {
    const [rows] = await pool.execute(
      `SELECT 
        r.*, 
        u.username as username
      FROM Reviews r 
      JOIN Users u ON r.user_id = u.id
      WHERE r.lunch_id = ?`,
      [lunchId]
    );
    return rows;
  }
  
  static async getByUserId(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM Reviews WHERE user_id = ?',
      [userId]
    );
    return rows;
  }
  
  static async getStats(lunchId) {
    const [stats] = await pool.execute(`
      SELECT 
        COUNT(*) as total_reviews,
        AVG(pay) as avg_pay,
        SUM(CASE WHEN cook_soup = 1 THEN 1 ELSE 0 END) as cook_soup_yes,
        SUM(CASE WHEN cook_soup = 0 THEN 1 ELSE 0 END) as cook_soup_no,
        SUM(CASE WHEN cook_food = 1 THEN 1 ELSE 0 END) as cook_food_yes,
        SUM(CASE WHEN cook_food = 0 THEN 1 ELSE 0 END) as cook_food_no,
        SUM(CASE WHEN cook_dessert = 1 THEN 1 ELSE 0 END) as cook_dessert_yes,
        SUM(CASE WHEN cook_dessert = 0 THEN 1 ELSE 0 END) as cook_dessert_no,
        SUM(CASE WHEN portion_size = 'small' THEN 1 ELSE 0 END) as portion_small,
        SUM(CASE WHEN portion_size = 'enough' THEN 1 ELSE 0 END) as portion_enough,
        SUM(CASE WHEN portion_size = 'too much' THEN 1 ELSE 0 END) as portion_too_much,
        SUM(CASE WHEN temperature = 'cold' THEN 1 ELSE 0 END) as temp_cold,
        SUM(CASE WHEN temperature = 'optimal' THEN 1 ELSE 0 END) as temp_optimal,
        SUM(CASE WHEN temperature = 'hot' THEN 1 ELSE 0 END) as temp_hot,
        SUM(CASE WHEN look = 'bad' THEN 1 ELSE 0 END) as look_bad,
        SUM(CASE WHEN look = 'okay' THEN 1 ELSE 0 END) as look_okay,
        SUM(CASE WHEN look = 'good' THEN 1 ELSE 0 END) as look_good
      FROM Reviews
      WHERE lunch_id = ?`,
      [lunchId]
    );
    
    const totalReviews = stats[0].total_reviews;
    return {
      total_reviews: totalReviews,
      avg_pay: stats[0].avg_pay,
      cook_soup_yes: ((stats[0].cook_soup_yes / totalReviews) * 100).toFixed(2),
      cook_soup_no: ((stats[0].cook_soup_no / totalReviews) * 100).toFixed(2),
      cook_food_yes: ((stats[0].cook_food_yes / totalReviews) * 100).toFixed(2),
      cook_food_no: ((stats[0].cook_food_no / totalReviews) * 100).toFixed(2),
      cook_dessert_yes: ((stats[0].cook_dessert_yes / totalReviews) * 100).toFixed(2),
      cook_dessert_no: ((stats[0].cook_dessert_no / totalReviews) * 100).toFixed(2),
      portion_small: ((stats[0].portion_small / totalReviews) * 100).toFixed(2),
      portion_enough: ((stats[0].portion_enough / totalReviews) * 100).toFixed(2),
      portion_too_much: ((stats[0].portion_too_much / totalReviews) * 100).toFixed(2),
      temp_cold: ((stats[0].temp_cold / totalReviews) * 100).toFixed(2),
      temp_optimal: ((stats[0].temp_optimal / totalReviews) * 100).toFixed(2),
      temp_hot: ((stats[0].temp_hot / totalReviews) * 100).toFixed(2),
      look_bad: ((stats[0].look_bad / totalReviews) * 100).toFixed(2),
      look_okay: ((stats[0].look_okay / totalReviews) * 100).toFixed(2),
      look_good: ((stats[0].look_good / totalReviews) * 100).toFixed(2)
    };
  }
}

module.exports = Review;