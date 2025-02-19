const Review = require('../models/review');

module.exports = {
  async submitReview(req, res) {
    try {
      const userId = req.user.id;
      const {lunchId, cookSoup, cookFood, cookDessert, pay, portion, temperature, look} = req.body;

      if (pay < 0 || pay > 200) {
        return res.status(400).json({ error: 'Neplatná částka' });
      }

      const hasReviewed = await Review.hasUserReviewedLunch(userId, lunchId);
      if (hasReviewed) {
        return res.status(400).json({ error: 'Již jste hodnotili tento oběd' });
      }

      await Review.create({
        lunchId, userId ,cookSoup, cookFood, cookDessert, pay, portion, temperature, look
      });
      
      res.status(201).json({ message: 'Recenze uložena' });
    } catch (error) {
      res.status(500).json({ error: 'Chyba ukládání recenze' });
    }
  },

  async checkReview(req, res) {
    try {
      const userId = req.user.id;
      const lunchId = req.query.lunchId;
      const hasReviewed = await Review.hasUserReviewedLunch(userId, lunchId);
      res.json({ hasReviewed });
    } catch (error) {
      res.status(500).json({ error: 'Chyba kontroly recenze' });
    }
  }
};