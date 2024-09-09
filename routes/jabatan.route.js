const jabatanController = require('../controllers/jabatan.controller');

const mid = require('../middlewares/auth.middleware');

const express = require('express');
const route = express.Router();

route.post('/jabatan/create', [mid.checkRolesAndLogout(['Super Admin'])], jabatanController.createjabatan);
route.get('/jabatan/get', jabatanController.getjabatan); 
route.get('/jabatan/get/:id', jabatanController.getjabatanById); 
route.put('/jabatan/update/:id', [mid.checkRolesAndLogout(['Super Admin'])], jabatanController.updatejabatan); 
route.delete('/jabatan/delete/:id', [mid.checkRolesAndLogout(['Super Admin'])], jabatanController.deletejabatan);

module.exports = route;