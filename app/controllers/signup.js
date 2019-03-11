
//Librerías
const      express   = require('express');
const      session   = require('express-session');
const   MongoStore   = require('connect-mongo')(session);
const     mongoose   = require('mongoose');
const   bodyParser   = require('body-parser');
const     passport   = require('passport');
const       router   = express.Router();

//Archivos
const Usuario   = require('../models/Usuarios');
//Conectar a MongoDB
const MONGO_URL = "mongodb://127.0.0.1:27017/lupulos";

module.exports = function (app) {
  app.use('/', router);
};

const app = express();

app.use(session({
  secret:'ESTO ES SECRETO',
  resave:true,
  saveUninitialized: true,
  store: new MongoStore({
      url: MONGO_URL,
      autoReconnect: true
  })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

router.get('/signup', function(req, res, next){

})

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
