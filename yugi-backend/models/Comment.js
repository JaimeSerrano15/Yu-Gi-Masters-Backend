//Se crea una constante con Mongoose para así poder crear esquemas que sirven de esqueleto para los datos que irán a la base 
const mongoose = require('mongoose'),
    Schema = mongoose.Schema

//Se crea el esquema de los comentarios con sus atributos respectivos. Estos son los esquemas que se irán al Cluster en línea en Mongo Atlas
var CommentSchema = Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    likes: Number,

    createdAt: {
        type: Date,
        default: Date.now
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    }
});

//Se exporta el modelo con el nombre de Comentarios
module.exports = mongoose.model('comentarios', CommentSchema);