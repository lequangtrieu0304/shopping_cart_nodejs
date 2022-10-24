const productRouter = require('./app/router/router');
const cartRouter = require('./app/router/cartRouter');

module.exports = (app) => {
    app.use('/product', productRouter);
    app.use('/cart', cartRouter);
}

