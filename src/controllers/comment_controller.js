const Comment = require('../models/comment');

module.exports = {
  async addComment(req, res) {
    try {
      const userId = req.user.id;
      const { lunchId, content, profanity } = req.body;
      
      // pridat profanity validaci
      
      const commentId = await Comment.create({ lunchId, userId, content, profanity });
      res.status(201).json({ message: 'Komentář uložen', commentId });
    } catch (error) {
      res.status(500).json({ error: 'Chyba ukládání komentáře' });
    }
  },

  async getComments(req, res) {
    try {
      const { lunchId } = req.query;
      if (!lunchId) {
        return res.status(400).json({ error: 'Chybějící lunchId' });
      }
      const comments = await Comment.getByLunchId(lunchId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Chyba načítání komentářů' });
    }
  }
};