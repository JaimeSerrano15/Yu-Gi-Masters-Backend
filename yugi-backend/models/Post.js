const mongoose = require('mongoose'),
    Schema = mongoose.Schema


var PostSchema = Schema({
    tittle: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },



});

module.exports = mongoose.model('publicaciones', PostSchema);