const WarehouseService = require('../services/warehouse.service');
const ApiError = require('../api-error');
const MongoDB = require("../utils/mongodb.util");

exports.addProductsToWarehouse = async(req, res, next) => {
    try {
        const warehouseService = new WarehouseService(MongoDB.client);
        const invoice = req.body;
        const result = await warehouseService.addProductsToWarehouse(invoice);
        res.json(result);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'An error occurred while adding products to the warehouse'));
    }
};

exports.getWarehouse = async(req, res, next) => {
    try {
        const warehouseService = new WarehouseService(MongoDB.client);
        const { number } = req.params;
        const warehouseItem = await warehouseService.getWarehouse(number);
        if (!warehouseItem) {
            res.status(404).json({ message: 'Warehouse item not found' });
            return;
        }
        res.json(warehouseItem);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'An error occurred while fetching warehouse item'));
    }
};

exports.getProductInWarehouse = async(req, res, next) => {
    try {
        const warehouseService = new WarehouseService(MongoDB.client);
        const { productId } = req.params;
        const warehouseProduct = await warehouseService.getProductInWarehouse(productId);
        if (!warehouseProduct) {
            res.status(404).json({ message: 'Product not found in the warehouse' });
            return;
        }
        res.json(warehouseProduct);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'An error occurred while fetching product from warehouse'));
    }
};

exports.getWarehouseItems = async(req, res, next) => {
    try {
        const warehouseService = new WarehouseService(MongoDB.client);
        const warehouseItems = await warehouseService.getWarehouseItems();
        res.json(warehouseItems);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'An error occurred while fetching warehouse items'));
    }
};

exports.getAllWarehouseItems = async(req, res, next) => {
    try {
        const warehouseService = new WarehouseService(MongoDB.client);
        const allWarehouseItems = await warehouseService.getAll();
        res.json(allWarehouseItems);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'An error occurred while fetching all warehouse items'));
    }
};