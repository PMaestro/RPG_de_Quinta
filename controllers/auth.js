const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'Super_Secret_key';


exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    let userData = null;
    if (!erros) {
        const validationFailed = new Error('Falha no preenchimento dos campos! Erro de validação');
        validationFailed.statusCode = 422;
        validationFailed.data = erros.array();
        throw validationFailed;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const description = req.body.description;
    const admin = req.body.admin;
    bcrypt.hash(password, 12)
        .then(hasedPassword => {
            /* se tiver envio de imagem atualizar a 
            url para a url da imagem enviada */
            if (req.file) {
                const imageUrl = req.file.path.replace("\\", "/");
                userData = new User({
                    name: name,
                    email: email,
                    password: hasedPassword,
                    description: description,
                    imageUrl: imageUrl,
                    admin: admin
                });
            }else{
                userData = new User({
                    name: name,
                    email: email,
                    password: hasedPassword,
                    description: description,
                    admin: admin
                });
            }
            return userData.save();
        })
        .then(result=>{
            return res.status(201).json({message: 'Usuario criado!', result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}

exports.login= (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({email: email})
    .then(user=>{
        if(!user){
            const error = new Error('Um usuario com esse email não existe');
            error.statusCode = 404;
            throw error;
        }
        loadedUser= user;
       return bcrypt.compare(password,user.password);
    })
    .then( isEqual =>{
        if(!isEqual){
            const error = new Error('Password incorreto!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedUser.email, userId: loadedUser._id.toString()},
            SECRET,
            {expiresIn: '1h'}
        );
        res.status(200).json({token: token , userId: loadedUser._id.toString()});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}