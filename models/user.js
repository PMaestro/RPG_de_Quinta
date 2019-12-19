const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
     type: String,
     required:true,
    }, 
    email:{
     type: String,
     //unique:true,
     required:true
    },
    password:{
     type: String,
     required:true,
    },
    description: String,
    imageUrl: {
        type: String,
        default: 'default_Avatar.png'
    },
    admin: Boolean,
    posts : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Post'}
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }

},{timestamps:true});


module.exports = mongoose.model('User', userSchema);
