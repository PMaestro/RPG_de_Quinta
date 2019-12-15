const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    tumblr:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    descrition: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);