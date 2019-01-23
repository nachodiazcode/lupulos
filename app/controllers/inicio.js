const   express = require('express');
const   session = require('express-session');
const    router = express.Router();
const Cervezas = require('../models/cervezas');

module.exports = function (app) {
    app.use('/', router);
};

module.exports.getInicio =  (req, res, next) => {

  Cervezas.find( (err, cervezas) => {

    res.render('inicio', {
        cervezas,
        tituloPrincipal : "¡Bienvenido a Lupulos!"
    })

}).sort({_id:-1})

};

