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

    author: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comentarios'
    }]

});

module.exports = mongoose.model('publicaciones', PostSchema);