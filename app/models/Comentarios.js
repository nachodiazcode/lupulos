const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comentarios = new Schema ({

    email: {type: String  },
    nombre: {type: String },
    comentario: {type: String},
    gravatar: {type: String}

}, { timestamps: true, type: Date, default: Date.now})

module.exports = mongoose.model('comentarios', Comentarios) 
