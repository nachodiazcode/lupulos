const  express = require('express');
const  session = require('express-session');
const  Lugares = require('../models/lugares');
const   router = express.Router();


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

    const lugarItem = req.params.item;
    
 
    getInformacionLugar(lugarItem)
    .then((lugares) => {
      res.render('lugares', {
        lugares,
        titulo: req.params.item 
      })
    })


    

};

const getInformacionLugar = (lugarItem) => {
    return Promise.all([
         Lugares.findOne({_id: lugarItem}),

    ]);
}
