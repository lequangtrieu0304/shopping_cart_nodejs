const cartRepository = require('../server/cartRepository');
const productRepository = require('../server/productRepository');

exports.addItemToCart = async (req, res) => {
    const { productId } = req.body
    const quantity = Number.parseInt(req.body.quantity);
    if (quantity < 1) {
        return res.status(400).json({ message: 'Quantity can not be less then 1' })
    }

    try {
        let cart = await cartRepository.cart();
        let productDetails = await productRepository.productById(productId);
        if (!productDetails) {
            return res.status(500).json({
                type: "not Found",
                msg: "invalid request"
            })
        }
        if (cart) {
            const indexFound = cart.items.findIndex(item => item.productId.id === productId);

            if (indexFound !== -1) {
                cart.items[indexFound].quantity += quantity;
                cart.items[indexFound].price = productDetails.price;
                cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
            else if (quantity > 0) {
                cart.items.push({
                    productId: productId,
                    quantity: quantity,
                    price: productDetails.price,
                    total: parseInt(productDetails.price * quantity)
                })
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next)
            }
            else {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Invalid request"
                })
            }
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                msg: " success request",
                data: data
            })
        }
        else {
            const cartData = {
                items: [{
                    productId: productId,
                    quantity: quantity,
                    total: parseInt(productDetails.price * quantity),
                    price: productDetails.price
                }],
                subTotal: parseInt(productDetails.price * quantity)
            }
            let cart = await cartRepository.addItem(cartData);
            await cart.save();
            res.json(cart)
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something Went Wrong",
            err: err
        })
    }
}

exports.addProductQuantityFromCart = async (req, res) => {
    const id = req.params.id;
    try {
        let cart = await cartRepository.cart();
        let itemFound = await cart.items.findIndex(item => item.id === id);
        if (itemFound !== -1) {
            cart.items[itemFound].quantity += 1;
            cart.items[itemFound].total = cart.items[itemFound].quantity * cart.items[itemFound].productId.price;
            cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
        }
        let data = await cart.save();
        res.status(200).json({
            type: "success",
            msg: " success request",
            data: data
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            type: "Invalid",
            msg: "Something Went Wrong",
            err: err
        })
    }
}

exports.SubtractProductQuantityFromCart = async (req, res) => {
    const id = req.params.id;
    try {
        let cart = await cartRepository.cart();
        let itemFound = await cart.items.findIndex(item => item.id === id);
        if (itemFound !== -1) {
            if (cart.items[itemFound].quantity >= 1) {
                cart.items[itemFound].quantity -= 1;
                cart.items[itemFound].total = cart.items[itemFound].quantity * parseInt(cart.items[itemFound].productId.price);
                // console.log(typeof(cart.items[itemFound].productId.price));
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
            if (cart.items[itemFound].quantity === 0) {
                cart.items.splice(itemFound, 1);
            }
        }
        let data = await cart.save();
        res.status(200).json({
            type: "success",
            msg: " success request",
            data: data
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            type: "Invalid",
            msg: "Something Went Wrong",
            err: err
        })
    }
}

exports.getCart = async (req, res) => {
    try {
        let cart = await cartRepository.cart();
        if (!cart) {
            return res.status(400).json({
                type: 'Invalid',
                msg: 'Cart not found'
            })
        }
        res.status(200).json({
            status: true,
            data: cart
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            type: "Invalid",
            msg: "Something Went Wrong",
            err: err
        });
    }
}

exports.removeItem = async (req, res) => {
    const id = req.params.id;
    try {
        let cart = await cartRepository.cart();
        let itemFound = await cart.items.findIndex(item => item.id === id);
        if (cart.items[itemFound]) {
            cart.items.splice(itemFound, 1)
            // console.log(cart.items.splice(itemFound, 1));
            if(cart.items.length === 0) {
                cart.subTotal = 0
            }
            else {
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
        }
        let data = await cart.save();
        res.status(200).json({
            type: "success",
            msg: " success request",
            data: data
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            type: "Invalid",
            msg: "Something Went Wrong",
            err: err
        });
    }
}
