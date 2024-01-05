const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, lowercase: true },
  username: { type: String },
  password: { type: String },
  biografia: { type: String },
  siguiendo: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  seguidores: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

userSchema.pre('save', function (next) {
  const usuario = this;

  // Si el usuario sigue a sí mismo, previene duplicados en siguiendo y seguidores
  if (usuario.siguiendo.indexOf(usuario._id) === -1) {
    usuario.siguiendo.push(usuario._id);
    usuario.seguidores.push(usuario._id);
  }

  if (!usuario.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(usuario.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      usuario.password = hash;
      next();
    });
  });
});

userSchema.methods.compararPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, sonIguales) => {
    if (err) {
      return cb(err);
    }
    cb(null, sonIguales);
  });
};

userSchema.methods.avatar = function (dimension = 55) {
  const hash = crypto.createHash('md5').update(this.email.toLowerCase().trim()).digest('hex');
  return `https://www.gravatar.com/avatar/${hash}?s=${dimension}&d=identicon`;
};

module.exports = mongoose.model('User', userSchema);