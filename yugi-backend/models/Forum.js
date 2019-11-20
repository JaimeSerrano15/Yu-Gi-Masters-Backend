const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ForumSchema = Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },

    membersNo: Number,

    createdAt: Date.now,

    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'publicaciones'
    }],

    members: [{
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    }],

    author: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    }
});

module.exports = mongoose.model('foros', ForumSchema);