const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cervezas = new Schema({
  titulo: {type:String},
  descripcion: {type: String},
  imagen:  {type: String},
  usuario: {type: Schema.Types.ObjectId, ref:'usuarios'},
  username:{type: String, ref:'usuarios'},
} , { timestamps: true } ) 

module.exports = mongoose.model('cervezas', Cervezas) 

