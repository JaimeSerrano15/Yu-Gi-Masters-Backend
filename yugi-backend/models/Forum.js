//Se crea una constante con Mongoose para así poder crear esquemas que sirven de esqueleto para los datos que irán a la base 
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Se crea el esquema de los foros con sus atributos respectivos. Estos son los esquemas que se irán al Cluster en línea    
var ForumSchema = Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },

    membersNo: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    posts: Array,

    members: Array, 
});

//Se exporta el modelo con el nombre de Foros
module.exports = mongoose.model('foros', ForumSchema);