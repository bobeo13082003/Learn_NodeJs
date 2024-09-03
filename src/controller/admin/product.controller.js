
const filterStatusHelper = require('../../helper/filterStatus')
const searchHelper = require('../../helper/search')
const paginationHelper = require('../../helper/pagination')
const system = require('../../config/system')
// [GET] /admin/product
const Product = require('../../model/product.model')
module.exports.product = async (req, res) => {

    const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: false
    }

    if (req.query.status) {
        find.status = req.query.status;
    }

    const search = searchHelper(req.query)
    if (search.regex) {
        find.title = search.regex;
    }

    //Pagination

    const allProducts = await Product.countDocuments(find)

    const objectPagination = paginationHelper(
        {
            currentPage: 1,
            limit: 4
        },
        allProducts,
        req.query
    );

    //end pagination


    const products = await Product.find(find)
        .sort({ position: 'desc' })
        .limit(objectPagination.limit)
        .skip(objectPagination.skip);

    res.render('admin/pages/product/index', {
        pageTitle: "Products page",
        products: products,
        filterStatus: filterStatus,
        search: search.search,
        pagination: objectPagination
    })
}
// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;

    await Product.updateOne({ _id: id }, { status: status })

    req.flash('success', 'Change Status Successfully');

    res.redirect('back')
}
// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
    const ids = req.body.ids.split(", ");
    const status = req.body.type;
    switch (status) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
            req.flash('success', `Change Active Of ${ids.length} Products Successfully`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            req.flash('success', `Change Inactive Of ${ids.length} Products Successfully`);

            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, {
                deleted: true,
                deleteAt: new Date()
            })
            req.flash('success', `Delete ${ids.length} Products Successfully`);

            break;
        case "change-position":
            for (const item of ids) {
                const [id, position] = item.split('-');
                await Product.updateOne({ _id: id }, {
                    position: parseInt(position)
                })
            }
            req.flash('success', `Change Position Products Successfully`);

            break;
        default:
            break;
    }
    res.redirect('back')
}
// [DELETE] /admin/product/delete/:id
module.exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    await Product.updateOne({ _id: id }, {
        deleted: true,
        deleteAt: new Date()
    })
    res.redirect('back')
}
//  [GET] /admin/product/cretae
module.exports.create = (req, res) => {
    res.render('admin/pages/product/createProduct', {
        pageTitle: "Create New Product"
    })
}
//  [POST] /admin/product/cretae
module.exports.postCreateProduct = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);


    if (req.body.position == "") {
        req.body.position = await Product.countDocuments() + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    const product = new Product(req.body);
    product.save();
    res.redirect(`${system.prefixAdmin}/product`)
}

// [GET] /admin/product/edit/id
module.exports.edit = async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.render('admin/pages/product/editProduct',
        {
            pageTitle: "Edit Product",
            product: product
        });
}

// [PATCH] /admin/product/edit/id
module.exports.editPatch = async (req, res) => {
    console.log(req.file)
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    console.log(req.params.id)

    try {
        await Product.updateOne({ _id: req.params.id }, req.body);
        req.flash("success", "Edit Product Successfully")
    } catch (error) {

    }

    res.redirect(`back`)
}

// [GET] /admin/product/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findById(find);

        res.render('admin/pages/product/detail', {
            pageTitle: "Detail Product",
            product: product
        })
    } catch (error) {
        res.redirect('back')
    }
}

