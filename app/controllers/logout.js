//Liberías
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const glob = require('glob');
const mongoose = require('mongoose');
const http = require('http');
const multer = require('multer');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors  = require('cors');
const router = express.Router();

//Archivos
const Usuario = require('../models/Usuarios');

module.exports = function (app) {
    app.use('/', router);
};

router.get('/logout', function(req, res, next){

  req.logout();
  res.redirect('/');
  console.log('logout exitoso');

})




