const tupoksiController = require('../controllers/tupoksi.controller');

const mid = require('../middlewares/auth.middleware');

const express = require('express');
const route = express.Router();
 
route.get('/tupoksi/get', tupoksiController.gettupoksi); 
route.put('/tupoksi/update', [mid.checkRolesAndLogout(['Super Admin'])], tupoksiController.updatetupoksi); 

module.exports = route;