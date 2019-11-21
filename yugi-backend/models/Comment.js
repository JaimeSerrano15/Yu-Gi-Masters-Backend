const mongoose = require('mongoose'),
    Schema = mongoose.Schema

var CommentSchema = Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    likes: Number,

    createdAt: {
        type: Date,
        default: Date.now
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    }
});

module.exports = mongoose.model('comentarios', CommentSchema);