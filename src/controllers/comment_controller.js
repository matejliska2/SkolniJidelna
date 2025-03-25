const Comment = require('../models/comment');
const leoProfanity = require('leo-profanity');
leoProfanity.loadDictionary();

module.exports = {
  async addComment(req, res) {
    try {
      const userId = req.user.id;
      const { lunchId, content } = req.body;
      
      const hasProfanity = leoProfanity.check(content);
      const profanity = hasProfanity ? "yes" : "no";
      const safeContent = hasProfanity ? "" : content;
      
      const commentId = await Comment.create({ lunchId, userId, content: safeContent, profanity });
      res.status(201).json({ message: 'Komentář uložen', commentId });
    } catch (error) {
      console.log(error);
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