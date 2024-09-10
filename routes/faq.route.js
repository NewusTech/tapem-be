const faqController = require('../controllers/faq.controller');

const mid = require('../middlewares/auth.middleware');

const express = require('express');
const route = express.Router();

route.post('/faq/create', [mid.checkRolesAndLogout(['Super Admin'])], faqController.createfaq);
route.get('/faq/get', faqController.getfaq); 
route.get('/faq/get/:id', faqController.getfaqById); 
route.put('/faq/update/:id', [mid.checkRolesAndLogout(['Super Admin'])], faqController.updatefaq); 
route.delete('/faq/delete/:id', [mid.checkRolesAndLogout(['Super Admin'])], faqController.deletefaq);

module.exports = route;