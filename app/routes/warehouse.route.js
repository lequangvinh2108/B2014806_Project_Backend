const express = require('express');
const warehouseController = require('../controllers/warehouse.controller');

const router = express.Router();

router.post('/addProductsToWarehouse', warehouseController.addProductsToWarehouse);
router.get('/getWarehouse/:number', warehouseController.getWarehouse);
router.get('/getProductInWarehouse/:productId', warehouseController.getProductInWarehouse);
router.get('/getWarehouseItems', warehouseController.getWarehouseItems);
router.get('/getAllWarehouseItems', warehouseController.getAllWarehouseItems);

module.exports = router;