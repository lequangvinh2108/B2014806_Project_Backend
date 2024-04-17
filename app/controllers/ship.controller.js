const ShipService = require('../services/ship.service');
const ApiError = require('../api-error');
const MongoDB = require("../utils/mongodb.util");

exports.createShippingInfo = async(req, res, next) => {
    try {
        const shipService = new ShipService(MongoDB.client);
        const { orderId, userId, cart, address, name, phone, totalMoney, deliveryInstructions, deliveryMethods, paymentMethods } = req.body;
        const result = await shipService.createShippingInfo(orderId, userId, cart, address, name, phone, totalMoney, deliveryInstructions, deliveryMethods, paymentMethods);
        res.json(result);
    } catch (error) {
        console.error(error);
        console.error("Error in createShippingInfo:", error.message);
        next(new ApiError(500, 'An error occurred while creating shipping info'));
    }
};

exports.getShip = async(req, res, next) => {
    try {
        const shipService = new ShipService(MongoDB.client);
        const orderId = req.params.orderId;
        const result = await shipService.getShip(orderId);
        res.json(result);
    } catch (error) {
        console.error("Error in getShip:", error.message);
        next(new ApiError(500, 'An error occurred while getting ship information'));
    }
};

exports.saveOrderToShip = async(req, res, next) => {
    try {
        const shipService = new ShipService(MongoDB.client);
        const order = req.body;
        const result = await shipService.saveOrderToShip(order);
        res.json(result);
    } catch (error) {
        console.error("Error in saveOrderToShip:", error.message);
        next(new ApiError(500, 'An error occurred while saving order to ship'));
    }
};

exports.getUserShip = async(req, res, next) => {
    try {
        const shipService = new ShipService(MongoDB.client);
        const userId = req.params.userId;
        const result = await shipService.getUserShip(userId);
        res.json(result);
    } catch (error) {
        console.error("Error in getUserShip:", error.message);
        next(new ApiError(500, 'An error occurred while getting user ship information'));
    }
};

exports.getOrderByOrderId = async(req, res, next) => {
    try {
        const shipService = new ShipService(MongoDB.client);
        const orderId = req.params.orderId;
        const result = await shipService.getOrderByOrderId(orderId);
        res.json(result);
    } catch (error) {
        console.error("Error in getOrderByOrderId:", error.message);
        next(new ApiError(500, 'An error occurred while getting order by orderId'));
    }
};

exports.getOrdersByUserId = async(req, res, next) => {
    try {
        const shipService = new ShipService(MongoDB.client);
        const userId = req.params.userId;
        const result = await shipService.getUserShip(userId);
        res.json(result);
    } catch (error) {
        console.error("Lỗi khi lấy đơn hàng của người dùng:", error.message);
        next(new ApiError(500, 'Đã xảy ra lỗi khi lấy thông tin đơn hàng của người dùng'));
    }
};

exports.getAllOrdersForShipper = async(req, res, next) => {
    try {
        const shipService = new ShipService(MongoDB.client);
        const userId = req.params.userId;
        const shipperOrders = await shipService.getAllOrdersForShipper(userId);
        res.json(shipperOrders);
    } catch (error) {
        console.error("Error in getAllOrdersForShipper:", error.message);
        next(new ApiError(500, 'An error occurred while getting shipper orders'));
    }
};