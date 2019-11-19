const moongose = require('mongoose'),
    Schema = moongose.Schema;

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

module.exports = moongose.model('cartas', CardSchema);