const mongoose = require('mongoose');
const {validationResult} = require('express-validator');
const Post =  require('../models/post');
/* const post = mongoose.model('post'); */

module.exports = {
    async listAll(req,res){
        const post = await Post.find().populate('userId tags','name email');
        return res.json(post);
    },
    async postCreate(req,res){
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(422).json({message:"Erro de validação"});
        }
        const post = await Post.create(req.body);
        return res.json(post);
    },
    async findPost(req,res){
        const post = await Post.findById(req.params.id).populate('tags');
        return res.json(post);
    },
    async updatePost(req,res){
        const post = await Post.findById(req.params.id);
        post.title = req.body.title;
        post.tumblr = req.body.tumblr;
        post.text = req.body.text;
        post.description = req.body.description;
        post.userId = req.body.userId;
        post.tags = req.body.tags;
       const updatedPost = Post.save();
       return res.json(updatedPost);
        
    },
    async deletePost(req,res){
        const post = await Post.findByIdAndDelete(req.body.id);
        return res.json(`Usuario ${post.name} deletado`);
    }

};
