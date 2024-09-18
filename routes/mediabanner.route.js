const mid = require('../middlewares/auth.middleware');

const express = require('express');
const mediabanner = require('../controllers/mediabanner.controller');

const route = express.Router();

route.post('/mediabanner/create', [mid.checkRolesAndLogout(['Super Admin'])], mediabanner.createMediaBanner);
route.get('/mediabanner/get', mediabanner.getMediaBanners); 
route.get('/mediabanner/get/:id', mediabanner.getMediaBannerById); 
route.put('/mediabanner/update/:id', [mid.checkRolesAndLogout(['Super Admin'])], mediabanner.updateMediaBanner); 
route.delete('/mediabanner/delete/:id', [mid.checkRolesAndLogout(['Super Admin'])], mediabanner.deleteMediaBanner);

module.exports = route;
