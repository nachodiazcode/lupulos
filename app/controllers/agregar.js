const   express   = require('express');
const    multer   = require('multer');
const   mongoose  = require('mongoose');
const     router  = express.Router();
const   Cervezas  = require('../models/cervezas');
const    Usuario  = require('../models/user');

const storage = multer.diskStorage({
	destination: function(req,file,next) {
		next(null, './public/');
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
			next(null, './public/');
		},

		filename : function(req, file, next){
			const ext = file.mimetype.split('/')[1] ;
			next(null,file.fieldname) ;
		},

		fileFilter : function (req, file, next) {

			if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ) {

				next(null, false);

			}else{

				next(null, true);

			}

		}

	})

}

module.exports.getAgregar = (req, res) => {

	res.render('agregar', {
		titulo : 'Agrega una nueva cerveza',
	});

};

module.exports.postAgregar = (req,res) => {
	
	const nuevoRegistro = new Cervezas({
		title:req.body.title,
		descripcion:req.body.descripcion,
		imagen:req.file.filename,
		comentarios:req.body.comentarios,
		usuario:req.user._id,
		username: req.user.username
	});

	nuevoRegistro.save();
	res.redirect('/inicio');

}
