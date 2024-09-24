const sambutanController = require('../controllers/sambutan.controller');
const mid = require('../middlewares/auth.middleware');
//express
const express = require('express');
const route = express.Router();

route.post('/sambutan/create', [mid.checkRolesAndLogout(['Super Admin'])], sambutanController.createSambutan);
route.get('/sambutan/get', sambutanController.getSambutan); 
// route.get('/role/get/:id', [mid.checkRolesAndLogout(['Super Admin'])], roleController.getroleById); 
// route.put('/role/update/:id', [mid.checkRolesAndLogout(['Super Admin'])], roleController.updaterole); 
route.delete('/sambutan/delete/:id', [mid.checkRolesAndLogout(['Super Admin'])], sambutanController.deleteSambutan);

module.exports = route;