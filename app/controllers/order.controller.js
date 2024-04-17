const OrderService = require('../services/order.service');
const ApiError = require('../api-error');
const MongoDB = require("../utils/mongodb.util");

exports.createOrder = async(req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const { userId, cart, address, name, phone, totalMoney, deliveryInstructions, deliveryMethods, paymentMethods, orderStatus } = req.body;
        const result = await orderService.createOrder(userId, cart, address, name, phone, totalMoney, deliveryInstructions, deliveryMethods, paymentMethods, orderStatus);
        res.json(result);
    } catch (error) {
        console.error(error);
        console.error("Error in createOrder:", error.message);
        next(new ApiError(500, 'An error occurred while creating the order'));
    }
};

exports.getOrder = async(req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const { userId, orderId } = req.params;
        const order = await orderService.getOrder(userId, orderId);
        res.json(order);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'An error occurred while getting the order'));
    }
};

exports.getUserOrders = async(req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const { userId } = req.params;
        const orders = await orderService.getUserOrders(userId);
        res.json(orders);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'An error occurred while getting user orders'));
    }
};

exports.getAllOrders = async(req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'An error occurred while getting all orders'));
    }
};

exports.deleteOrder = async(req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const { userId, orderId } = req.params;
        const result = await orderService.deleteOrder(userId, orderId);
        res.json(result);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'An error occurred while deleting the order'));
    }
};

exports.deleteOrderById = async(req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const { orderId } = req.params;
        const result = await orderService.deleteOrderById(orderId);
        res.json(result);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'An error occurred while deleting the order'));
    }
};

exports.createShippingInfo = async(req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const { userId, cart, address, name, phone, totalMoney, deliveryInstructions, deliveryMethods, paymentMethods } = req.body;
        const result = await orderService.createShippingInfo(userId, cart, address, name, phone, totalMoney, deliveryInstructions, deliveryMethods, paymentMethods);
        res.json(result);
    } catch (error) {
        console.error(error);
        console.error("Error in createShippingInfo:", error.message);
        next(new ApiError(500, 'An error occurred while creating shipping info'));
    }
};

exports.updateOrderStatus = async(req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const { orderId } = req.params;
        const { newStatus } = req.body;
        const result = await orderService.updateOrderStatus(orderId, newStatus);
        res.json(result);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'An error occurred while updating order status'));
    }
};

exports.updateDeliveryStatus = async(req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const { orderId } = req.params;
        const { orderStatus } = req.body;
        const result = await orderService.updateDeliveryStatus(orderId, orderStatus);
        res.json(result);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'An error occurred while updating delivery status'));
    }
};

exports.getOrderByDeliveryStatus = async(req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const { deliveryStatus } = req.params;
        const orders = await orderService.getOrderByDeliveryStatus(deliveryStatus);
        res.json(orders);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'An error occurred while getting orders by delivery status'));
    }
};

exports.getorderId = async(req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const { orderId } = req.params;
        const order = await orderService.getorderId(orderId);
        res.json(order);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'An error occurred while getting the order'));
    }
};