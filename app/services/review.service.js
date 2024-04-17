const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");

class ReviewService {
    constructor(client) {
        this.Review = client.db().collection("review");
        this.client = client;
    }

    async createReview(userId, productId, nameProduct, ratingScale, comment) {
        try {
            if (!ObjectId.isValid(userId) || !ObjectId.isValid(productId)) {
                throw new Error("Invalid userId or productId");
            }

            const review = {
                userId: userId,
                productId: productId,
                nameProduct: nameProduct,
                ratingScale: ratingScale,
                comment: comment,
            };

            const result = await this.Review.insertOne(review);
            return result && result.ops ? result.ops[0] : null;
        } catch (error) {
            console.error("Error in createReview:", error.message);
            throw error;
        }
    }

    async getReviewsByProductId(productId) {
        try {
            const reviews = await this.Review.find({ productId: productId }).toArray();
            return reviews;
        } catch (error) {
            console.error("Error getting reviews by product ID:", error.message);
            throw error;
        }
    }

}

module.exports = ReviewService;