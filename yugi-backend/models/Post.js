//Se crea una constante con Mongoose para así poder crear esquemas que sirven de esqueleto para los datos que irán a la base 
const mongoose = require('mongoose'),
    Schema = mongoose.Schema

//Se crea el esquema de los post con sus atributos respectivos. Estos son los esquemas que se irán al Cluster en línea
var PostSchema = Schema({
    tittle: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comentarios'
    }]

});

//Se exporta el modelo con el nombre de Publicaciones
module.exports = mongoose.model('publicaciones', PostSchema);