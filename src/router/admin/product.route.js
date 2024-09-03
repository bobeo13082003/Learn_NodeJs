const express = require('express');
const multer = require('multer')
const storageHelper = require('../../helper/storageMulter')
const upload = multer({ storage: storageHelper() })
const routes = express.Router();
const controller = require('../../controller/admin/product.controller')
const validate = require('../../validate/admin/product.validate')


routes.get('/', controller.product);

routes.patch('/change-status/:status/:id', controller.changeStatus)

routes.patch('/change-multi', controller.changeMulti)

routes.delete('/delete/:id', controller.deleteProduct)

routes.get('/create', controller.create)

routes.post('/create',
    upload.single('thumbnail'),
    validate.createPost,
    controller.postCreateProduct
)

routes.get('/edit/:id', controller.edit)

routes.patch('/edit/:id',
    upload.single('thumbnail'),
    validate.createPost,
    controller.editPatch)

routes.get('/detail/:id', controller.detail)

module.exports = routes;