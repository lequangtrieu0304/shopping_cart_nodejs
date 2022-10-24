const router = require("express").Router();

const productController = require("../controller/productController");

router.post('/',  productController.createProduct);

router.get("/", productController.getProduct);

router.get("/:id", productController.productById);

router.delete("/:id", productController.deleteProduct);

module.exports = router;