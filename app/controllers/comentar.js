const express  = require('express'),
	  multer   = require('multer'),
	  mongoose = require('mongoose'),
	  router   = express.Router(),
    Cervezas = mongoose.model('cervezas');


module.exports = function(app){
  app.use('/',router);
};


router.get('/comentar', function (req, res){


  res.render('comentar', {
    titulo : 'Agrega una nueva cerveza',
  });

});



router.get('/comentar/:item', (req,res)=>{

  return Cervezas.findOneAndUpdate(
      {_id : req.user_id},
      {$push: {comentario:req.body.comentario}}
  )



});
