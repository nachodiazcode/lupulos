const   express  = require('express');
const      session  = require('express-session');
const    MongoStore  = require('connect-mongo')(session);
const      mongoose  = require('mongoose');
const      passport  = require('passport');
const        router  = express.Router();
const       Usuario  = require('../models/Usuarios');
const      Cervezas  = require('../models/Cervezas');
const configPassport = ('../config/passport.js');
const LocalStrategy  = require('passport-local').Strategy;
const          cors  = require('cors');

module.exports = function (app) {
  app.use('/', router);

};

const app = express();

router.get('/borrar', function(req, res, next){
    res.render('borrar', {
        titulo:titulo
    });
})

router.post('/borrar/:item', function(req,res, next){



      Cervezas.findByIdAndRemove({

        _id:  req.params.item

      }, (err, cervezas ) => {

        if(err){
          res.send(err);
        }

      })

      Cervezas.findById(()=>{
        if(err){
          res.send(err);
        }
      })


      res.redirect('/cervezas');


})
