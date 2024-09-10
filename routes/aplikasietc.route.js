const aplikasietcController = require('../controllers/aplikasietc.controller');

const mid = require('../middlewares/auth.middleware');

const express = require('express');
const route = express.Router();

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post('/aplikasietc/create', [mid.checkRolesAndLogout(['Super Admin'])], upload.single('image'), aplikasietcController.createAplikasietcs);
route.get('/aplikasietc/get', aplikasietcController.getAplikasietcs); 
route.get('/aplikasietc/get/:id', aplikasietcController.getAplikasietcsByid); 
route.put('/aplikasietc/update/:id', [mid.checkRolesAndLogout(['Super Admin'])], upload.single('image'), aplikasietcController.updateAplikasietcs); 
route.delete('/aplikasietc/delete/:id', [mid.checkRolesAndLogout(['Super Admin'])], aplikasietcController.deleteAplikasietcs);

module.exports = route;