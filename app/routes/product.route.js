const express = require("express");
const products = require("../controllers/product.controller");

const router = express.Router();

router.route("/")
    .get(products.findAll)
    .post(products.create)
    .delete(products.deleteAll);

router.route("/favorite")
    .get(products.findAllFavorite);

router.route("/:id")
    .get(products.findOne)
    .put(products.update)
    .delete(products.delete);

router.put("/updateCode/:code", products.updateCode);
router.get("/findByCode/:code", products.findByCode);
router.put("/updateDiscount/:code", products.updateDiscount);

module.exports = router;