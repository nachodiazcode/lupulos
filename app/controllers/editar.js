const   express   = require('express'),
        session   = require('express-session'),
       mongoose   = require('mongoose'),
       passport   = require('passport'),
         router   = express.Router(),
        Usuario   = mongoose.model('users'),
       Cervezas   = mongoose.model('cervezas'),
  LocalStrategy   = require('passport-local').Strategy,
           cors   = require('cors');

module.exports = function (app) {
  app.use('/', router);

};

const app = express();

router.get('/editar', function(req, res, next){

})

router.post('/editar/:item', function(req,res,next){



})
