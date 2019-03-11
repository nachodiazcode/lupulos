const       express = require('express');
const       session = require('express-session');
const    MongoStore = require('connect-mongo')(session);
const        router = express.Router();
const      mongoose = require('mongoose');
const    bodyParser = require('body-parser');
const      passport = require('passport');




const Usuario = require('../models/Usuarios');

const MONGO_URL = "mongodb://127.0.0.1:27017/lupulos";

const app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

module.exports = function (app) {
  app.use('/', router);
};

module.exports.postSignUp = (req, res, next) =>{

  const Usuario = new Usuario({
    email:req.body.email,
    username:req.body.email,
    password:req.body.password,
    biografia: req.body.biografia,
    siguiendo: [{type:Schema.Types.ObjectId, ref:'user'}],
    seguidores: [{type:Schema.Types.ObjectId, ref:'user'}]
  });

  Usuario.findOne({email:req.body.email}, (err, usuarioExistente) => {
        if(usuarioExistente){
          return res.status(400).send('El correo que pusiste no es válido ya que se encuentra registrado!')
        }

        nuevoUsuario.save((err) => {
            if(err){
              next(err);
            }

            req.logIn(nuevoUsuario, (err) => {
                if (err) {
                  next(err);
                }

                res.send('¡Gracias por registrarte en Lupulos!');
            })
        })
  })

}

module.exports.postLogin =  (req, res, next) => {

  passport.authenticate('local', (err, usuario, info) => {

    if(err){
      next(err);
    }

    if(!usuario) {
        return res.redirect('404');
    }

    req.logIn(usuario, (err) => {
        if(err){
          next(err);
        }
        res.send('Login exitoso');
    })

  })(req, res, next);

}

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

router.get('/user', (req, res, next)  => {


});
