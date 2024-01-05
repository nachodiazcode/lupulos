const   express  = require('express'),
        session  = require('express-session'),
     MongoStore  = require('connect-mongo'),
       mongoose  = require('mongoose'),
       passport  = require('passport'),
         router  = express.Router(),
        Usuario  = mongoose.model('users'),
       Cervezas  = mongoose.model('cervezas'),
  configPassport = ('../config/passport.js'),
  LocalStrategy  = require('passport-local').Strategy,
           cors  = require('cors');

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
