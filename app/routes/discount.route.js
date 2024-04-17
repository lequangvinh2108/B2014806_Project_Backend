const express = require('express');
const router = express.Router();
const discountController = require("../controllers/discount.controller");


router.post('/createDiscount', discountController.createDiscount);
router.get('/getAll', discountController.getAll);
router.get('/getDiscountByCode/:code', discountController.getDiscountByCode);
router.delete('/deleteDiscount/:code', discountController.deleteDiscount);


module.exports = router;