const express =  require('express');
const routes = express.Router();
const UserController = require('../controllers/user');

routes.get('/',(req,res,next)=>{
    res.send('RPG de Quinta iniciado!');
})

routes.get('/user', UserController.index);

routes.post('/user/Create', UserController.userCreate);

module.exports = routes;