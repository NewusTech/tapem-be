const sambutanController = require('../controllers/sambutan.controller');
const mid = require('../middlewares/auth.middleware');
//express
const express = require('express');
const route = express.Router();

route.post('/sambutan/create', [mid.checkRolesAndLogout(['Super Admin'])], sambutanController.createSambutan);
route.get('/sambutan/get', sambutanController.getSambutan); 
route.get('/sambutan/get/:id', [mid.checkRolesAndLogout(['Super Admin'])], sambutanController.getSambutanById); 
route.put('/sambutan/update/:id', [mid.checkRolesAndLogout(['Super Admin'])], sambutanController.updateSambutan); 
route.delete('/sambutan/delete/:id', [mid.checkRolesAndLogout(['Super Admin'])], sambutanController.deleteSambutan);

module.exports = route;