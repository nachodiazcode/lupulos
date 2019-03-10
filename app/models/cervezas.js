const mongoose = require('mongoose');
const   Schema = mongoose.Schema;

const Cervezas = new Schema({

  title: {type:String},
  descripcion: {type: String},
  imagen: {type: String},
  usuario: {type: Schema.Types.ObjectId, ref:'user'},
  username:{type: String, ref:'user'},


} , { timestamps: true } ) ;


module.exports = mongoose.model('cervezas', Cervezas) ;

