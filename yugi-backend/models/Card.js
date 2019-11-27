//Se crea una constante con Mongoose para así poder crear esquemas que sirven de esqueleto para los datos que irán a la base 
const moongose = require('mongoose'),
    Schema = moongose.Schema;

//Se crea el esquema de la carta con sus atributos respectivos. Estos son los esquemas que se irán al Cluster en línea
var CardSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    attribute: String,

    stars: Number,

    description: String,

    type : String
});

//Se exporta el modelo con el nombre de Cartas
module.exports = moongose.model('cartas', CardSchema);