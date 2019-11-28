const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

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

  cards: [{
    type: Object
  }
  ]
});

module.exports = mongoose.model("mazos", DeckSchema);
