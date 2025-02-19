const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authController = require('../controllers/auth_controller');
const reviewController = require('../controllers/review_controller');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.use(auth);
router.post('/reviews', reviewController.submitReview);
router.get('/reviews/check', reviewController.checkReview);

module.exports = router;