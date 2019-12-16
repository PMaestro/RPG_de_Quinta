const mongoose = require('mongoose');
const {validationResult} = require('express-validator');
const tryAwait = require('../util/AsyncTryCatch');

const User = require('../models/user');
/* const User = mongoose.model('User'); */

module.exports = {
    async listAll(req, res) {
        const user = await User.find();
        res.json(user);

    },
    async userCreate(req, res, next) {
        try {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            const error = new Error('Erro de validação, entrada de dados incorretos');
            error.statusCode = 422;
            throw error;
        }
        const userToCreate = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            admin: req.body.admin
        }
       
            const userExist = await User.find({ email: userToCreate.email }).select('-password');
            if (userExist.length == 0) {
                const user = await User.create(req.body);
                return res.json({ message: 'Usuario cadastrado', user });
            } else {
                return res.json({ message: 'Email já cadastrado', userExist });
            }
        } catch (err) {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next (err);
        }

    },

    async findUser(req, res) {
        const user = await User.findById(req.params.id);
        return res.json(user);
    },

    async updateUser(req, res) {

        const userToCreate = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            admin: req.body.admin
        }
        try {
            const user = await User.findById(req.params.id);
            if (userExist) {
                const updatedUser = user.save();
                return res.json({ message: 'Usuario Atualizado' }, updatedUser);
            } else {
                return res.json({ message: 'Usuario não encontrado' });
            }

        } catch (error) {
            console.log(error);
        }
    },
    async deleteUser(req, res) {
        const user = await User.findByIdAndDelete(req.body.id);
        return res.json(`Usuario ${user.name} deletado`);
    }
};
