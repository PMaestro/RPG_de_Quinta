const mongoose = require('mongoose'); 

const Schema =  mongoose.Schema;

const tagSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description: String,
    postsId:[
        {type: mongoose.Schema.Types.ObjectId,ref:'Post'}
    ]
});

module.exports = mongoose.model('Tag', tagSchema);