const express = require('express');
const routes = express.Router();
const dashboardController = require('../../controller/admin/dashboard.controller')

routes.get('/', dashboardController.dashboard)

module.exports = routes;