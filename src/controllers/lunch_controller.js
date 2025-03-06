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
  },
  
  async getLunchByDate(req, res) {
    try {
      const { date } = req.query;
      if (!date) {
        return res.status(400).json({ error: 'Chybějící datum' });
      }
      
      const lunches = await Lunch.getByDate(date);
      if (!lunches.length) {
        return res.status(404).json({ error: 'Oběd nenalezen' });
      }
      
      res.json(lunches);
    } catch (error) {
      res.status(500).json({ error: 'Chyba načítání oběda' });
    }
  },

  async getAllLunches(req, res) {
    try {
      const lunches = await Lunch.getAll();
      const result = {};
      lunches.forEach(lunch => {
        result[lunch.id] = {
          lunch_date: lunch.lunch_date,
          content: lunch.content,
          lunch_number: lunch.lunch_number
        };
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Chyba načítání obědů' });
    }
  }
};