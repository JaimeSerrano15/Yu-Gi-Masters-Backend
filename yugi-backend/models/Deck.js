//Se crea una constante con Mongoose para así poder crear esquemas que sirven de esqueleto para los datos que irán a la base 
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

//Se crea el esquema del deck con sus atributos respectivos. Estos son los esquemas que se irán al Cluster en línea  
var DeckSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  cardsNo: {
    type: Number,
    default: 0
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "usuarios"
  },

  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "cartas"
    }
  ]
});

//Se exporta el modelo con el nombre de Mazos
module.exports = mongoose.model("mazos", DeckSchema);
