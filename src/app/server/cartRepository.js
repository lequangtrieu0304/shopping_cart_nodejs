const Cart = require('../model/cartModel');

exports.cart = async () => {
    const carts = await Cart.find().populate({
        path: "items.productId",
        select: "name price"
    })
    // console.log(carts[0]);
    return carts[0];
}

exports.addItem = async (payload) => {
    const newItem = await Cart.create(payload)
    return newItem;
}
