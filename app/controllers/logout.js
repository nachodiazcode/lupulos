const   express = require('express'),
        session = require('express-session'),
     MongoStore = require('connect-mongo')(session),
           glob = require('glob'),
       mongoose = require('mongoose'),
           http = require('http'),
         multer = require('multer'),
     bodyParser = require('body-parser'),
       passport = require('passport'),
         router = express.Router(),
        Usuario = require('../models/Usuarios'),
  LocalStrategy = require('passport-local').Strategy,
          cors  = require('cors');

module.exports = function (app) {
    app.use('/', router);
};


router.get('/logout', function(req, res, next){


  req.logout();
  res.redirect('/');
  console.log('logout exitoso');


})




