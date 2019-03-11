const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const Usuarios = new Schema({

  email: {type: String, lowercase: true },
  username: {type: String},
  password: {type: String},
  biografia: {type: String},
  siguiendo: [{type: Schema.Types.ObjectId, ref:'user'}],
  seguidores: [{type: Schema.Types.ObjectId, ref:'user'}],

}, { timestamps: true } )

Usuarios.pre('save', function ( next ){

      const usuario = this ;
      const usuarioId = usuario._id ;

      if (usuario.siguiendo.indexOf (usuarioId) === -1 ){
        usuario.siguiendo.push(usuarioId);
        usuario.seguidores.push(usuarioId);
      }

      if( !usuario.isModified('password')) {
          return next() ;
      }

      bcrypt.genSalt(10, (err, salt ) => {

          if(err){
              next(err);
          }

          bcrypt.hash(usuario.password, salt, null, ( err, hash ) => {

              if(err){
                  next(err);
              }
              usuario.password = hash ;
              next();

          })
      })
})

Usuarios.methods.compararPassword = function ( password, cb) {

  bcrypt.compare(password, this.password, (err, sonIguales ) => {
      if(err){
          return cb(err);
      }
      cb(null, sonIguales);
  })
}

Usuarios.methods.avatar = function(dimension=55){
    const md5 = crypto.createHash('md5').update(this.email).digest('hex') ;
    return `https://api.adorable.io/avatars/${dimension}/${md5}` ;
}


module.exports = mongoose.model('usuarios', Usuarios) ;


