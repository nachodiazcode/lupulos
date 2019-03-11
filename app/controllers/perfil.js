

//Librerías

const express  = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const router  = express.Router();

//modelos 
const Cervezas  = require('../models/Cervezas');
const Usuario   =  require('../models/Usuarios');

//controladores
const controladorCervezas = require('./agregar');
const controladorInicio = require('./inicio');

const app = express();

module.exports = function(app){
	app.use('/',router);
};

module.exports.getMiPerfil =  (req, res) => {
        
        getInformacionPerfil(req.user._id)
        .then(([usuario,cervezas]) => {
            res.render('perfil', {
                usuario,
                cervezas,
                estaSiguiendo:false,
                esconderBotones: true
            })
        })
}

module.exports.getPerfil = (req, res) => {

     const usuarioId = req.params.id;
     const estaSiendoSeguido = req.user ? req.user.siguiendo.indexOf(usuarioId) > -1 : false;
     const esconderBotones = req.user ? false : true;
   
     if (req.user && req.user._id.equals(usuarioId)) {
       return res.redirect('/mi/perfil');
     }

    getInformacionPerfil(usuarioId)
       .then(([usuario, cervezas]) => {
         res.render('perfil', {
           usuario,
           cervezas,
           estaSiendoSeguido,
           esconderBotones
         })
       })
    
}

const getInformacionPerfil = (usuarioId) => {
    return Promise.all([
         Usuario.findOne({_id: usuarioId}),
         controladorCervezas.getCervezasParaUsuarios([usuarioId])

    ]);
}

module.exports.seguir =  (req, res) => {

    const usuarioLogueadoId = req.user._id ;
    const usuarioId = req.params.id ; 
    
    Promise.all([
        agregarSiguiendo(usuarioLogueadoId, usuarioId),
        agregarSeguidor(usuarioLogueadoId, usuarioId)
    ]).then(()=>{
        res.redirect(`/perfil/${usuarioId}`); 
        
    })

}

module.exports.unseguir =  (req, res) => {

    const usuarioLogueadoId = req.user._id ;
    const usuarioId = req.params.id ; 
    
    Promise.all([
        eliminarSiguiendo(usuarioLogueadoId, usuarioId),
        eliminarSeguidor(usuarioLogueadoId, usuarioId)
    ]).then(()=>{
        res.redirect(`/perfil/${usuarioId}`); 
        
    })

}

const agregarSiguiendo  = (usuarioLogueadoId, usuarioId) => {

    return Usuario.findOneAndUpdate(
        {_id: usuarioLogueadoId},
        {$push:{siguiendo: usuarioId }}
    )

}

const agregarSeguidor  = (usuarioLogueadoId, usuarioId) => {

    return Usuario.findOneAndUpdate(
        {_id: usuarioId},
        {$push:{seguidores: usuarioLogueadoId }}
    )

}

const eliminarSiguiendo  = (usuarioLogueadoId, usuarioId) => {

    return Usuario.findOneAndUpdate(
        {_id: usuarioLogueadoId},
        {$pull:{siguiendo: usuarioId }}
    )

}

const eliminarSeguidor  = (usuarioLogueadoId, usuarioId) => {

    return Usuario.findOneAndUpdate(
        {_id: usuarioId},
        {$pull:{seguidores: usuarioLogueadoId }}
    )

}