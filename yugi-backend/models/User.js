//Se crea una constante con Mongoose para así poder crear esquemas que sirven de esqueleto para los datos que irán a la base 
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Declaración de modelo de 'User', el cual hace referencia al esquema, es decir, a los atributos que posee la colección dentro del
//Cluster en línea.

var UserSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    follows: {
        type: Number,
        default: 0
    },

    chat: Array,

});

//Se exporta el modelo con nombre de Usuarios
module.exports = mongoose.model('usuarios', UserSchema);