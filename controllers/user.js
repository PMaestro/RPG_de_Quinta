const mongoose = require('mongoose');

const User =  require('../models/user');
/* const User = mongoose.model('User'); */

module.exports = {
    async index(req,res){
        const user = await User.find();
        
        return res.json(user);
    },

    async userCreate(req,res){
        const user = await User.create(req.body);
        return res.json(user);
    },
};
