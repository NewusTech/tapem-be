const route = require('express').Router();
const strukturOrganisasiControler = require('../controllers/strukturorganisasi.controller');
const mid = require('../middlewares/auth.middleware');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post('/struktur/create', [mid.checkRolesAndLogout(['Super Admin'])], upload.single('file'),strukturOrganisasiControler.createStruktur);
route.get('/struktur/get', strukturOrganisasiControler.getStruktur);
route.put('/struktur/update/:id', [mid.checkRolesAndLogout(['Super Admin'])], upload.single('file'), strukturOrganisasiControler.updateStruktur);

module.exports = route;