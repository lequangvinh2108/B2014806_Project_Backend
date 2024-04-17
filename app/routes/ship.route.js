const express = require('express');
const shipController = require('../controllers/ship.controller');

const router = express.Router();

router.post('/createShippingInfo', shipController.createShippingInfo);
router.get('/getShip/:orderId', shipController.getShip);
router.post('/saveOrder', shipController.saveOrderToShip);
router.get('/getUserShip/:userId', shipController.getUserShip);
router.get('/getOrderByOrderId/:orderId', shipController.getOrderByOrderId);
router.get('/getOrdersByUserId/:userId', shipController.getOrdersByUserId);
router.get('/getAllOrdersForShipper/:userId', shipController.getAllOrdersForShipper);


module.exports = router;