const mid = require('../middlewares/auth.middleware');

const express = require('express');
const route = express.Router();

const multer = require('multer');
const regioninfo = require('../controllers/regioninfo.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post('/regioninfo/create', [mid.checkRolesAndLogout(['Super Admin'])], upload.single('image'), regioninfo.createRegionInfo);
route.get('/regioninfo/get', regioninfo.getRegionInfos); 
route.get('/regioninfo/get/:id', regioninfo.getRegionInfoById); 
route.put('/regioninfo/update/:id', [mid.checkRolesAndLogout(['Super Admin'])], upload.single('image'), regioninfo.updateRegionInfo); 
route.delete('/regioninfo/delete/:id', [mid.checkRolesAndLogout(['Super Admin'])], regioninfo.deleteRegionInfo);

module.exports = route;
