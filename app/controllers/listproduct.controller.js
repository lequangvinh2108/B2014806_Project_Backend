const ListProductService = require('../services/listproduct.service');
const ApiError = require('../api-error');
const MongoDB = require("../utils/mongodb.util");

exports.createProduct = async(req, res, next) => {
    try {
        const productService = new ListProductService(MongoDB.client);
        const { code, name, price, quantity, mass, imgUrl, description, expiry, importday, placeproduction } = req.body;
        const result = await productService.createProduct(code, name, price, quantity, mass, imgUrl, description, expiry, importday, placeproduction);
        res.json(result);
    } catch (error) {
        console.error(error);
        console.error("Error in createProduct:", error.message);
        next(new ApiError(500, 'An error occurred while creating product'));
    }
};

exports.getProduct = async(req, res, next) => {
    try {
        const productService = new ListProductService(MongoDB.client);
        const productId = req.params.productId;
        const result = await productService.getProduct(productId);
        res.json(result);
    } catch (error) {
        console.error("Error in getProduct:", error.message);
        next(new ApiError(500, 'An error occurred while getting product information'));
    }
};

exports.updateProduct = async(req, res, next) => {
    try {
        const productService = new ListProductService(MongoDB.client);
        const code = req.params.code;
        const productData = req.body;
        const result = await productService.updateProduct(code, productData);
        res.json(result);
    } catch (error) {
        console.error("Error in updateProduct:", error.message);
        next(new ApiError(500, 'An error occurred while updating product'));
    }
};

exports.getAll = async(req, res, next) => {
    try {
        const productService = new ListProductService(MongoDB.client);
        const products = await productService.getAll();
        res.json(products);
    } catch (error) {
        console.error("Error in getAll:", error.message);
        next(new ApiError(500, 'An error occurred while getting all products'));
    }
};

exports.deleteProduct = async(req, res, next) => {
    try {
        const productService = new ListProductService(MongoDB.client);
        const productId = req.params.productId;
        const result = await productService.deleteProduct(productId);
        res.json(result);
    } catch (error) {
        console.error("Error in deleteProduct:", error.message);
        next(new ApiError(500, 'An error occurred while deleting product'));
    }
};

exports.deleteAllProducts = async(req, res, next) => {
    try {
        const productService = new ListProductService(MongoDB.client);
        const result = await productService.deleteAllProducts();
        res.json(result);
    } catch (error) {
        console.error("Error in deleteAllProducts:", error.message);
        next(new ApiError(500, 'An error occurred while deleting all products'));
    }
};



exports.updateId = async(req, res, next) => {
    try {
        const productService = new ListProductService(MongoDB.client);
        const productId = req.params.productId;
        const productData = req.body;
        const result = await productService.updateId(productId, productData);
        res.json(result);
    } catch (error) {
        console.error("Error in updateProduct:", error.message);
        next(new ApiError(500, 'An error occurred while updating product'));
    }
};