const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Lugares = new Schema  ({

     nombre: {type:String},
     direccion: {type:String},
     imagen: {type:String}

})

module.exports = mongoose.model('lugares', Lugares) ;
