const express = require('express');
const authController = require('../controllers/auth');
const User = require('../models/user');
const { body } = require('express-validator');
const routes = express.Router();

routes.post('/login', [
    body('name').trim().not().isEmpty(),
    body('email').isEmail().withMessage('Entre com um email válido!').
        custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-mail já em uso!');
                }
            })
        }).normalizeEmail(),
    body('password').trim().isLength({ min: 6 })
], authController.signup);

routes.post('/login', authController.login);

module.exports = routes;