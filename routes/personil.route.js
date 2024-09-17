const personilController = require('../controllers/personil.controller');

const mid = require('../middlewares/auth.middleware');

const express = require('express');
const route = express.Router();

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post('/personil/create', [mid.checkRolesAndLogout([, 'Super Admin'])], upload.single('image'), personilController.createpersonil);
route.get('/personil/get', personilController.getpersonil); 
route.get('/personil/get/:id', personilController.getpersonilById); 
route.put('/personil/update/:id', [mid.checkRolesAndLogout([, 'Super Admin'])], upload.single('image'), personilController.updatepersonil); 
route.delete('/personil/delete/:id', [mid.checkRolesAndLogout([, 'Super Admin'])], personilController.deletepersonil);

module.exports = route;