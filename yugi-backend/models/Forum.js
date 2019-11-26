const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ForumSchema = Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },

    membersNo: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    posts: Array,

    members: Array, 
});

module.exports = mongoose.model('foros', ForumSchema);