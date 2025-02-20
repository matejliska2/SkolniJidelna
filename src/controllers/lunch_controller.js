const Lunch = require('../models/lunch');

module.exports = {
  async getLunch(req, res) {
    try {
      const [lunch] = await pool.execute(
        'SELECT * FROM Lunches WHERE id = ?',
        [req.params.id]
      );
      
      if (!lunch.length) {
        return res.status(404).json({ error: 'Oběd nenalezen' });
      }
      
      res.json(lunch[0]);
    } catch (error) {
      res.status(500).json({ error: 'Chyba načítání oběda' });
    }
  }
};