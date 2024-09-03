const express = require('express');
const routes = express.Router();
const controller = require('../../controller/client/product.controller')

routes.get('/', controller.products)

routes.get('/:slug', controller.detail)

module.exports = routes;