const productRepository = require('../server/productRepository');

exports.createProduct = async (req, res) => {
    try {
        let payload = {
            name : req.body.name,
            price: req.body.price,
            image: req.file.path
        }
        let product = await productRepository.createProduct({
            ...payload
        });
        res.status(200).json({status: true, data: product});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: err, status: false});
    }
}


exports.getProduct = async (req, res) => {
    try {
        const product = await productRepository.products();
        res.status(200).json({status: true, data: product})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: false, error: err})
    }
}

exports.productById = async (req, res) => {
    const id = req.params.id;
    try{ 
        const product = await productRepository.productById(id);
        res.status(200).json({status: true, data: product});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({status: false, error: err})
    }
}

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    try{ 
        const product = await productRepository.removeProduct(id);
        res.status(200).json({status: true, data: product});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({status: false, error: err})
    }
}

