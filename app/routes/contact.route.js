const express = require('express');
const router = express.Router();
const contactController = require("../controllers/contact.controller");


router.post('/createContact', contactController.createContact);
router.get('/getAll', contactController.getAll);


module.exports = router;