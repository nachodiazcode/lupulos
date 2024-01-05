const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Usuario = require('../models/user'); // Modifiqué la importación del modelo

const MONGO_URL = "mongodb://127.0.0.1:27017/lupulos";

const app = express();

// Aquí van las configuraciones de sesión, passport, body-parser, etc.

module.exports = function (app) {
  app.use('/', router);
};

module.exports.postSignUp = (req, res, next) => {
  const { email, username, password, biografia } = req.body;

  Usuario.findOne({ email: email }, (err, usuarioExistente) => {
    if (usuarioExistente) {
      return res.status(400).send('El correo ya está registrado');
    }

    const nuevoUsuario = new Usuario({
      email,
      username,
      password,
      biografia,
      siguiendo: [],
      seguidores: []
    });

    nuevoUsuario.save((err, user) => {
      if (err) {
        return next(err);
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        res.send('¡Gracias por registrarte en Lupulos!');
      });
    });
  });
};


module.exports.logout = (req, res) => {
  req.logout(); // Cierra la sesión del usuario
  res.redirect('/'); // Redirige a la página principal o a donde desees después del logout
};