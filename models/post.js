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
   // descrition: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      tags:[
          {type: Schema.Types.ObjectId,ref: 'Tag'}
      ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);