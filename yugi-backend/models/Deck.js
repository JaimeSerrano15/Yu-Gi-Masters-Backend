const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DeckSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    cardsNo: Number,

    author: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },

    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'cartas'
    }],

});

module.exports = mongoose.model('mazos', DeckSchema);