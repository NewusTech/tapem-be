const userinfoController = require('../controllers/userinfo.controller');

const mid = require('../middlewares/auth.middleware');

const express = require('express');
const route = express.Router();

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.get('/userinfo/get', [mid.checkRolesAndLogout(['Super Admin', 'User'])], userinfoController.getuserdata); 
route.get('/userinfo/get/:slug', [mid.checkRolesAndLogout(['Super Admin', 'User'])], userinfoController.getuserByslug); 
route.delete('/userinfo/delete/:slug', [mid.checkRolesAndLogout(['Super Admin'])], userinfoController.deleteuser);

route.post('/userinfo/create', [mid.checkRolesAndLogout(['Super Admin'])], userinfoController.createuserinfo); 
route.put('/userinfo/update/:slug', [mid.checkRolesAndLogout(['Super Admin', 'User'])], userinfoController.updateuserinfo);
route.put('/userinfo/updatefoto/:slug', [mid.checkRolesAndLogout(['Admin Instansi', 'Admin Verifikasi', 'Admin Layanan', 'Super Admin', 'User'])], upload.single('fotoprofil'), userinfoController.updateprofil); 

module.exports = route;