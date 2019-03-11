const   express = require('express');
const   session = require('express-session');
const    router = express.Router();
const controladorAgregar= require('./agregar')


const Cervezas = require('../models/Cervezas');


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

module.exports.getDetallesCervezas =  (req, res, next) => {

    const cervezaItem = req.params.item;

    getInformacionCervezas(cervezaItem)
    .then((cervezas) => {
      res.render('cerveza', {
        cervezas })
    })


};

const getInformacionCervezas = (cervezaItem) => {
    return Promise.all([
         Cervezas.findOne({_id: cervezaItem}),
    ]);
}
