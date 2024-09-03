// [GET] /product

const Product = require('../../model/product.model')
module.exports.products = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: 'desc' });
    products.map(item => {
        item.newPrice = (item.price * (item.discountPercentage / 100)).toFixed(0)
        return item;
    })
    // products.forEach(item => {
    //     item.newPrice = (item.price * (item.discountPercentage / 100)).toFixed(0);
    // });
    res.render('client/pages/products/index', { title: "Products", products: products })
}

// [GET] product/slug
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
        const product = await Product.findOne(find)
        product.newPrice = (product.price * (product.discountPercentage / 100))

        res.render('client/pages/products/detail', {
            pageTitle: "Product Detail",
            product: product
        })
    } catch (error) {
        // res.redirect('/product')
    }
}
