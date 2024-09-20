const express = require('express');
const dashboardController = require('../controllers/dashboard.controller');
const route = express.Router();


route.get('/dashboard', dashboardController.getDashboardData);

module.exports = route