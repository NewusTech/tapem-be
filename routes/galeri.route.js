const galeriController = require('../controllers/galeri.controller');

const mid = require('../middlewares/auth.middleware');

const express = require('express');
const route = express.Router();

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post('/galeri/create', [mid.checkRolesAndLogout(['Super Admin'])], upload.fields([{ name: 'image', maxCount: 1 }, { name: 'mediaLink', maxCount: 1 }]), galeriController.createGaleri);
route.get('/galeri/get', galeriController.getGaleri); 
route.get('/galeri/get/:id', galeriController.getGaleriById); 
route.put('/galeri/update/:id', [mid.checkRolesAndLogout(['Super Admin'])], upload.fields([{ name: 'image', maxCount: 1 }, { name: 'mediaLink', maxCount: 1 }]), galeriController.updateGaleri); 
route.delete('/galeri/delete/:id', [mid.checkRolesAndLogout(['Super Admin'])], galeriController.deleteGaleri);

module.exports = route;