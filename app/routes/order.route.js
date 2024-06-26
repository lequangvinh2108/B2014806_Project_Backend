const express = require('express');
const orderController = require('../controllers/order.controller');

const router = express.Router();

router.post('/createOrder', orderController.createOrder);
router.get('/getOrder/:userId/:orderId', orderController.getOrder);
router.get('/getUserOrders/:userId', orderController.getUserOrders);
router.get('/getAllOrders', orderController.getAllOrders);
router.delete('/deleteOrder/:userId/:orderId', orderController.deleteOrder);
router.delete('/deleteOrder/:orderId', orderController.deleteOrderById);

router.post('/createShippingInfo', orderController.createShippingInfo);
router.put('/updateOrderStatus/:orderId', orderController.updateOrderStatus);
router.put('/updateDeliveryStatus/:orderId', orderController.updateDeliveryStatus);
router.get('/getOrderByDeliveryStatus/:deliveryStatus', orderController.getOrderByDeliveryStatus);
router.get('/getorderId/:orderId', orderController.getorderId);




module.exports = router;