const  express = require('express');
const   router = express.Router();
const      app = express();
const mongoose = require('mongoose');

module.exports = function (app) {
  app.use('/', router);
};

module.exports.getComunidad = (req, res, next)=>{

    res.render('comunidad', {
        tituloPrincipal : "¡Bienvenido a Lupulos!"
    });

};








