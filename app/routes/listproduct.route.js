const express = require('express');
const listProductController = require('../controllers/listproduct.controller');

const router = express.Router();

router.post('/createProduct', listProductController.createProduct);
router.get('/getProduct/:productId', listProductController.getProduct);
router.put('/updateProduct/:code', listProductController.updateProduct);
router.delete('/deleteProduct/:productId', listProductController.deleteProduct);
router.delete('/deleteAllProducts', listProductController.deleteAllProducts);
router.get('/getAll', listProductController.getAll);
router.put('/updateId/:productId', listProductController.updateId);



module.exports = router;