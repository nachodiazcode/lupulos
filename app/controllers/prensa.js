const   express = require('express');
const   session = require('express-session');
const  mongoose = require('mongoose');
const    router = express.Router();

module.exports = function (app) {
  app.use('/prensa', router);
};

module.exports.getPrensa = (req, res, next)=>{

    res.render('prensa',{
      tituloPrincipal : "Bienvenido a Prensa"
    });

};

