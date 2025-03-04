const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authController = require('../controllers/auth_controller');
const lunchController = require('../controllers/lunch_controller');
const reviewController = require('../controllers/review_controller');
const commentController = require('../controllers/comment_controller');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/lunches/:id', lunchController.getLunch);
router.get('/lunches/date', lunchController.getLunchByDate);
router.get('/lunches/all', lunchController.getAllLunches);

router.post('/reviews', reviewController.addReview);
router.get('/reviews/check', reviewController.checkReview);
router.get('/reviews', reviewController.getReviews);
router.get('/reviews/stats', reviewController.getStats); // GET /api/reviews/stats?lunchId=1

router.post('/comments', commentController.addComment);
router.get('/comments', commentController.getComments);

module.exports = router;