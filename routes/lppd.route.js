const lppdController = require('../controllers/lppd.controller');

const mid = require('../middlewares/auth.middleware');

const express = require('express');
const route = express.Router();

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post('/lppd/create', [mid.checkRolesAndLogout(['Super Admin'])], upload.single('fileLampiran'), lppdController.createLppd);
route.get('/lppd/get', lppdController.getLppd); 
route.get('/lppd/get/:id', lppdController.getLppdByid); 
route.put('/lppd/update/:id', [mid.checkRolesAndLogout(['Super Admin'])], upload.single('fileLampiran'), lppdController.updateLppd); 
route.delete('/lppd/delete/:id', [mid.checkRolesAndLogout(['Super Admin'])], lppdController.deleteLppd);

module.exports = route;