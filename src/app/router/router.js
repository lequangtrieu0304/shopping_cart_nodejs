const router = require("express").Router();

const productController = require("../controller/productController");
const multer = require('./uploadRouter')

router.post('/', multer.upload.single('image'), productController.createProduct);

router.get("/", productController.getProduct);

router.get("/:id", productController.productById);

router.delete("/:id", productController.deleteProduct);

module.exports = router;