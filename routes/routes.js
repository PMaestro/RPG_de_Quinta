const express = require('express');
const { body } = require('express-validator');
const routes = express.Router();
const UserController = require('../controllers/user');
const TagController = require('../controllers/tag');
const PostController = require('../controllers/post');
const isAuth = require('../util/is-auth');

routes.get('/', (req, res, next) => {
    res.send('RPG de Quinta iniciado!');
})
//Users Routes
routes.get('/user', isAuth,UserController.listAll);

routes.get('/user/:id', isAuth,UserController.findUser);

routes.post('/user/Create',isAuth ,[
    body('name').trim().isLength({ min: 4 }),
    body('email').isEmail(),
    body('password').trim().isLength({ min: 6 })
], UserController.userCreate);

routes.put('/user/update/:id', isAuth,UserController.updateUser);

routes.delete('/user/delete', isAuth,UserController.deleteUser);

//Tag Routes
routes.get('/tag', isAuth, TagController.listAll);

routes.get('/tag/:id', isAuth, TagController.findTag);

routes.post('/tag/create', isAuth, TagController.tagCreate);

routes.put('/tag/update/:id', isAuth, TagController.updateTag);

routes.delete('/tag/delete', isAuth, TagController.deleteTag);

//Post Routes
routes.get('/post', isAuth, PostController.listAll);

routes.get('/post/:id', isAuth, PostController.findPost);

routes.post('/post/create', isAuth, [
    body('title').trim().isLength({ min: 8 }),
    body('text').trim().isLength({ min: 15 })
], PostController.postCreate);

routes.put('/post/update/:id', isAuth, [
    body('title').trim().isLength({ min: 8 }),
    body('text').trim().isLength({ min: 15 })
], PostController.updatePost);

routes.delete('/post/delete', isAuth,PostController.deletePost);


module.exports = routes;