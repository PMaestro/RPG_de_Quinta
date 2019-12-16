const express = require('express');
const { body } = require('express-validator');
const routes = express.Router();
const UserController = require('../controllers/user');
const TagController = require('../controllers/tag');
const PostController = require('../controllers/post');

routes.get('/', (req, res, next) => {
    res.send('RPG de Quinta iniciado!');
})
//Users Routes
routes.get('/user', UserController.listAll);

routes.get('/user/:id', UserController.findUser);

routes.post('/user/Create', [
    body('name').trim().isLength({min:4}),
    body('email').isEmail(),
    body('password').trim().isLength({min:6})
 ], UserController.userCreate);

routes.post('/user/update/:id',UserController.updateUser);

routes.post('/user/delete', UserController.deleteUser);

//Tag Routes
routes.get('/tag', TagController.listAll);

routes.get('/tag/:id', TagController.findTag);

routes.post('/tag/create',TagController.tagCreate);

routes.post('/tag/update/:id', TagController.updateTag);

routes.post('/tag/delete', TagController.deleteTag);

//Post Routes
routes.get('/post', PostController.listAll);

routes.get('/post/:id', PostController.findPost);

routes.post('/post/create',[
    body('title').trim().isLength({min:8}),
    body('text').trim().isLength({min:15})
] ,PostController.postCreate);

routes.post('/post/update/:id', PostController.updatePost);

routes.post('/post/delete', PostController.deletePost);


module.exports = routes;