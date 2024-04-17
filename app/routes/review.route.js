const express = require('express');
const reviewController = require('../controllers/review.controller');

const router = express.Router();

router.post('/createReview', reviewController.createReview);
router.get('/getReviewsByProductId/:productId', reviewController.getReviewsByProductId);

module.exports = router;