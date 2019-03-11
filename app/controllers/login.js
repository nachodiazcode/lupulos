//Liberías
const express   = require('express');
const session   = require('express-session');
const MongoStore  = require('connect-mongo')(session);
const mongoose = require('mongoose');
const passport = require('passport');
const router   = express.Router();
const LocalStrategy  = require('passport-local').Strategy;
const cors   = require('cors');

//Archivos
const Usuario = require('../models/Usuarios');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/login', function(req, res, next){

})

passport.serializeUser((usuario, done ) => {
  done(null, usuario._id);
})

passport.deserializeUser((id, done)=>{
  Usuario.findById(id,(err, usuario)=>{
    done(err, usuario);
  })
})

passport.use(new LocalStrategy(
  {usernameField:'email'},
  (email,password, done) => {

    Usuario.findOne({email},( err, usuario ) => {

      if(!usuario ){
        return done(null, false, {message: `Este email: ${email} no esta registrado` });
      } else {

        usuario.compararPassword(password, (err, sonIguales) => {

            if(sonIguales){
                return done(null, usuario);
            } else {
                return done(null, false, {message:'La contraseña no es válida'});
            }

        })

      }

    })

  }

))

router.post('/login', function(req, res, next){

  passport.authenticate('local', (err, usuario, info) => {

    if(err){
      next(err);
    }

    if(!usuario) {
        return res.status(400).send('Email o contraseña no válidos');
    }

    req.logIn(usuario, (err) => {
        if(err){
          next(err);
        }
        res.redirect('/inicio');
        console.log('login exitoso');
    })

  })(req, res, next);

})

router.get('/estaAutenticado', function(req, res, next){

  if(req.isAuthenticated()){

    return next();

  }

  res.status(401).send('Tienes que hacer login para acceder a este recurso');


})
