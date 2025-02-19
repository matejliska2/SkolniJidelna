const pool = require('../config/db');

class Lunch {
  static async getByDate(date) {
    const [rows] = await pool.execute(
      'SELECT * FROM Lunches WHERE lunch_date = ?',
      [date]
    );
    return rows;
  }
}

module.exports = Lunch;