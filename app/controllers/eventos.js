const    express = require('express');
const    session = require('express-session');
const     router = express.Router();
const   mongoose = require('mongoose');
const   Cervezas = mongoose.model('cervezas');



module.exports = function (app) {
  app.use('/', router);
};

module.exports.getEventos = (req, res, next) => {

    res.render('eventos', {
        tituloPrincipal : "¡Bienvenido a Lupulos!"
    });

};








