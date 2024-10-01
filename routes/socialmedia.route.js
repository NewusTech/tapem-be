const socialMediaController = require('../controllers/socialmedia.controller');
const mid = require('../middlewares/auth.middleware');
//express
const express = require('express');
const route = express.Router();

route.post('/socialmedia/create', [mid.checkRolesAndLogout(['Super Admin'])], socialMediaController.createSocialMedia);
route.get('/socialmedia/get', socialMediaController.getSocialMedia); 
route.get('/socialmedia/get/:id', [mid.checkRolesAndLogout(['Super Admin'])], socialMediaController.getSocialMediaById); 
route.put('/socialmedia/update/:id', [mid.checkRolesAndLogout(['Super Admin'])], socialMediaController.updateSocialMedia); 
route.delete('/socialmedia/delete/:id', [mid.checkRolesAndLogout(['Super Admin'])], socialMediaController.deleteSocialMedia);

module.exports = route;