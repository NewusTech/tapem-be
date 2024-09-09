const artikelRoute = require('./artikel.route');
const personilRoute = require('./personil.route');
const galeriRoute = require('./galeri.route');
const jabatanRoute = require('./jabatan.route');
const kategoriartikelRoute = require('./kategoriartikel.route');
const userRoute = require('./user.route');
const userinfoRoute = require('./userinfo.route');
const roleRoute = require('./role.route');
const tupoksiRoute = require('./tupoksi.route');
const permissionRoute = require('./permission.route');

module.exports = function (app, urlApi) {
    app.use(urlApi, artikelRoute);
    app.use(urlApi, galeriRoute);
    app.use(urlApi, jabatanRoute);
    app.use(urlApi, kategoriartikelRoute);
    app.use(urlApi, personilRoute);
    app.use(urlApi, userRoute);
    app.use(urlApi, userinfoRoute);
    app.use(urlApi, roleRoute);
    app.use(urlApi, tupoksiRoute);
    app.use(urlApi, permissionRoute);
}