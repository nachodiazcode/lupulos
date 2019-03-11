//Librerías
const    express  = require('express');
const     multer  = require('multer');
const   mongoose  = require('mongoose');
const     router  = express.Router();
//Archivos
const   Cervezas  = require('../models/Cervezas');
const    Usuario  = require('../models/Usuarios');

const storage = multer.diskStorage({
	destination: function(req,file,next) {
		next(null, './../../public/upload/');
	},

	filename: function(req, file, next) {
		next(null, file.originalname);
	}

});

const upload = multer ({ storage : storage }) ;

module.exports = function(app){
	app.use('/',router);
};

const multerConf = {

	storage : multer.diskStorage({

		destination : function (req ,file,next){
			next(null, './public/upload/');
		},

		filename : function(req, file, next){
			const ext = file.mimetype.split('/')[1] ;
			next(null,file.fieldname) ;
		},

		fileFilter : function (req, file, next) {

			if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === video/quicktime || file.mimetpye === video/mp4 || file.mimetype === application/x-mpegURL ) {

				next(null, false);

			}else{

				next(null, true);

			}

		}

	})

};

module.exports.getAgregar = (req, res, cervezas, usuarios) => {

	res.render('agregar', {
		titulo : 'Agrega una nueva cerveza',
		cervezas,
		usuarios
	});

};

module.exports.postAgregar = (req,res) => {
	
	const nuevaCerveza = new Cervezas({
		titulo:req.body.titulo,
		descripcion:req.body.descripcion,
		imagen:req.file.filename,
		comentarios:req.body.comentarios,
		usuario:req.user._id,
		username: req.user.username
	});

	nuevaCerveza.save();
	res.redirect('/inicio');

};

module.exports.getCervezasParaUsuarios  = (usuarioIds) => {
     return Cervezas
          .find({usuario: {$in: usuarioIds}})
          .sort({createdAt: -1 })
          .populate('usuarios');
};