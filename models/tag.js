const mongoose = require('mongoose'); 

const Schema =  mongoose.Schema;

const tagSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    descrition: String
});

module.exports = mongoose.model('Tag', tagSchema);