const  express = require('express');
const  session = require('express-session');
const  Lugares = require('../models/lugares');
const   router = express.Router();

const  controladorLugares = require('./lugares');


module.exports = function (app) {
    app.use('/', router);
};

module.exports.getLugares =  (req, res, next) => {

    Lugares.find((err,lugares)=>{
        res.render('lugares',{
           lugares,
           tituloPrincipal: 'Bienvenido a Lúpulos'
        })
    })

};

module.exports.getDetalleDelLugar =  (req, res, next) => {

    const lugarId = req.params.id;

    getInformacionLugar(lugarId)
    .then((lugares) => {
      res.render('lugar', {
        lugares,
        tituloPrincipal: 'Bienvenido a Lúpulos',
        lugarId: req.param.id 

     
      })
    })
 
};


const getInformacionLugar = (lugarId) => {
    return Promise.all([
         Lugares.find({_id: lugarId}),

    ]);
}
