const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const Post = require('../models/post');
/* const post = mongoose.model('post'); */

module.exports = {
    async listAll(req, res, next) {
        try {
            const currentPage = req.query.page || 1;
            const perPage = 10;
            const totalPosts = await Post.find().countDocuments();
            const post = await Post.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
                .populate('userId tags', 'name email');
            return res.status(200).json({ message: 'Posts encontrados com sucesso:', post, totalPosts });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            throw (err);
        }
    },
    async postCreate(req, res) {
        try {
            const erros = validationResult(req);
            if (!erros.isEmpty()) {
                return res.status(422).json({ message: "Erro de validação" });
            }
            if (!req.file) {
                const error = new Error('Nenhuma imagem , entrada de dados incorretos');
                error.statusCode = 422;
                throw error;
            }
            const imageUrl = req.file.path.replace("\\", "/");
            const post = await Post.create({
                title: req.body.title,
                tumblr: imageUrl,
                text: req.body.text,
                userId: req.body.userId,
                tags: req.body.tags
            });
            return res.status(201).json({ message: 'Post criado com sucesso!', post });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            throw (err);
        }
    },
    async findPost(req, res) {
        
        const post = await Post.findById(req.params.id).populate('tags');
        return res.json(post);
    },
    async updatePost(req, res) {
        try {
            const erros = validationResult(req);
            if (!erros.isEmpty()) {
                return res.status(422).json({ message: "Erro de validação" });
            }
            if (!req.file) {
                const error = new Error('Nenhuma imagem enviada');
                error.statusCode = 422;
                throw error;
            }
            let imgUrl = req.body.tumblr;
            if (req.file) {
                imgUrl = req.file.path.replace("\\", "/");
            }
            if (!imgUrl) {
                const error = new Error('Nenhuma imagem enviada.');
                error.statusCode = 422;
                throw error;
            }
            const post = await Post.findById(req.params.id);
            if (!post) {
                const error = new Error('Nenhum post encontrado!');
                error.statusCode = 422;
                throw error;
            }
            if (imgUrl !== post.tumblr) {
                this.clearImage(post.imgUrl);
            }
            post.title = req.body.title;
            post.tumblr = imgUrl;//new imgurl set to post
            post.text = req.body.text;
            post.description = req.body.description;
            post.userId = req.body.userId;
            post.tags = req.body.tags;

            const updatedPost = Post.save();
            return res.status(200).json({ message: 'Post atualizado com sucesso!', updatedPost });

        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            throw (err);
        }

    },
    async deletePost(req, res) {
        try {
            const post = await Post.findById(req.body.id);
            if (!post) {
                const error = new Error('Nenhum post encontrado!');
                error.statusCode = 422;
                throw error;
            }

            this.clearImage(post.imgUrl);
            post = await Post.findByIdAndDelete(req.body.id);
            return res.json(`Usuario ${post.name} deletado`);

        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            throw (err);
        }
    },

};

const clearImage = filePath => {
    filePath = path.join(__dirname, '../', filePath);
    fs.unlink(filePath, err => console.log(err));

}