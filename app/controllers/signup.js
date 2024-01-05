const      express   = require('express');
const      session   = require('express-session');
const   MongoStore   = require('connect-mongo');
const     mongoose   = require('mongoose');
const   bodyParser   = require('body-parser');
const     passport   = require('passport');
const       router   = express.Router();
const      Usuario   = require('../models/user');

require('dotenv').config();

module.exports = function (app) {
  app.use('/', router);
};

const app = express();

app.use(session({
  secret: process.env.JWT,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.URI_DB, // Asegúrate de proporcionar la URL correcta a MongoDB
    ttl: 14 * 24 * 60 * 60, // tiempo de vida opcional de la sesión en segundos
    autoRemove: 'native' // opción para limpieza automática de sesiones caducadas
  })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

router.post('/signup', function(req, res, next){

  const nuevoUsuario = new Usuario({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    biografia: req.body.biografia
  });

  Usuario.findOne({email:req.body.email}, (err, usuarioExistente) => {

    if (usuarioExistente){
      return res.status(400).send('Ya ese email esta registrado');
    }

    nuevoUsuario.save((err) => {

      if(err){
        next(err);
      }

      req.logIn(nuevoUsuario, (err) => {
        if (err){
          next(err);
        }
        res.redirect('inicio');

      })
    })
  })

})
