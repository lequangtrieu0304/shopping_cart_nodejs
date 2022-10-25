const router = require('express').Router();

const cartController = require('../controller/cartController');

router.post('/', cartController.addItemToCart);

router.get('/', cartController.getCart)

router.get('/add-cart/:id', cartController.addProductQuantityFromCart);

router.get('/subtract-cart/:id', cartController.SubtractProductQuantityFromCart);

router.get('/delete-item/:id', cartController.removeItem)

router.delete('/empty-cart', cartController.emptyCart)

module.exports = router;