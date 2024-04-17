const DiscountService = require('../services/discount.service');
const ApiError = require('../api-error');
const MongoDB = require("../utils/mongodb.util");


exports.createDiscount = async(req, res, next) => {
    try {
        const discountService = new DiscountService(MongoDB.client);
        const { code, product, discount, startDay, finishedDay } = req.body;
        const result = await discountService.createDiscount(code, product, discount, startDay, finishedDay);
        res.json(result);
    } catch (error) {
        console.error(error);
        console.error("Error in createDiscount:", error.message);
        next(new ApiError(500, 'An error occurred while creating discount'));
    }
};

exports.getAll = async(req, res, next) => {
    try {
        const discountService = new DiscountService(MongoDB.client);
        const discount = await discountService.getAll();
        res.json(discount);
    } catch (error) {
        console.error("Error in getAll:", error.message);
        next(new ApiError(500, 'An error occurred while getting all discount'));
    }
};

exports.getDiscountByCode = async(req, res, next) => {
    try {
        const discountService = new DiscountService(MongoDB.client);
        const { code } = req.params;
        const discount = await discountService.getDiscountByCode(code);
        if (!discount) {
            res.status(404).json({ message: 'discount item not found' });
            return;
        }
        res.json(discount);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'An error occurred while fetching discount'));
    }
};

exports.deleteDiscount = async(req, res, next) => {
    try {
        const discountService = new DiscountService(MongoDB.client);
        const { code } = req.params;
        const deletedCount = await discountService.deleteDiscount(code);
        if (deletedCount === 0) {
            res.status(404).json({ message: 'Discount not found or already deleted' });
            return;
        }
        res.json({ message: 'Discount deleted successfully' });
    } catch (error) {
        console.error("Error in deleteDiscount:", error.message);
        next(new ApiError(500, 'An error occurred while deleting discount'));
    }
};