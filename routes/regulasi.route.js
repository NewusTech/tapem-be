const route = require('express').Router();
const regulasiController = require('../controllers/regulasi.controller');
const mid = require('../middlewares/auth.middleware');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post('/regulasi/create', [mid.checkRolesAndLogout(['Super Admin'])], upload.single('file'),regulasiController.createRegulasi);
route.get('/regulasi/get', regulasiController.getRegulasi);
route.get('/regulasi/get/:id', regulasiController.getRegulasiByID);
route.put('/regulasi/update/:id', [mid.checkRolesAndLogout(['Super Admin'])], upload.single('file'), regulasiController.updateRegulasi);
route.delete('/regulasi/delete/:id', [mid.checkRolesAndLogout(['Super Admin'])], regulasiController.deleteRegulasi);

module.exports = route;