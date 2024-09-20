const aplikasietcRoute = require('./aplikasietc.route');
const artikelRoute = require('./artikel.route');
const carouselRoute = require('./carousel.route');
const contactRoute = require('./contact.route');
const personilRoute = require('./personil.route');
const galeriRoute = require('./galeri.route');
const faqRoute = require('./faq.route');
const jabatanRoute = require('./jabatan.route');
const kategoriartikelRoute = require('./kategoriartikel.route');
const userRoute = require('./user.route');
const userinfoRoute = require('./userinfo.route');
const roleRoute = require('./role.route');
const tupoksiRoute = require('./tupoksi.route');
const permissionRoute = require('./permission.route');
const regionInfoRoute = require('./regioninfo.route');
const mediaBennerRoute = require('./mediabanner.route');
const dashboardRoute = require('./dashboard.route');

module.exports = function (app, urlApi) {
    app.use(urlApi, aplikasietcRoute);
    app.use(urlApi, artikelRoute);
    app.use(urlApi, carouselRoute);
    app.use(urlApi, contactRoute);
    app.use(urlApi, galeriRoute);
    app.use(urlApi, faqRoute);
    app.use(urlApi, jabatanRoute);
    app.use(urlApi, kategoriartikelRoute);
    app.use(urlApi, personilRoute);
    app.use(urlApi, userRoute);
    app.use(urlApi, userinfoRoute);
    app.use(urlApi, roleRoute);
    app.use(urlApi, tupoksiRoute);
    app.use(urlApi, permissionRoute);
    app.use(urlApi, regionInfoRoute);
    app.use(urlApi, mediaBennerRoute);
    app.use(urlApi, dashboardRoute);
}