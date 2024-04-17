const ReviewService = require('../services/review.service');
const ApiError = require('../api-error');
const MongoDB = require("../utils/mongodb.util");

exports.createReview = async(req, res, next) => {
    try {
        const reviewService = new ReviewService(MongoDB.client);
        const { userId, productId, nameProduct, ratingScale, comment } = req.body;
        const result = await reviewService.createReview(userId, productId, nameProduct, ratingScale, comment);
        res.json(result);
    } catch (error) {
        console.error(error);
        console.error("Error in createReview:", error.message);
        next(new ApiError(500, 'An error occurred while creating the review'));
    }
};

exports.getReviewsByProductId = async(req, res, next) => {
    try {
        const reviewService = new ReviewService(MongoDB.client);
        const { productId } = req.params;
        const reviews = await reviewService.getReviewsByProductId(productId);
        res.json(reviews);
    } catch (error) {
        console.error(error);
        console.error("Error getting reviews by product ID:", error.message);
        next(new ApiError(500, 'An error occurred while getting reviews by product ID'));
    }
};