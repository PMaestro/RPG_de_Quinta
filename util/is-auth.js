const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'Super_Secret_key';

module.exports = (req,res, next)=>{
    const authHeader = req.get('Authorization')
    if(!authHeader){
        const error = new Error('Não autorizado.');
        error.statusCode = 401;
        throw error;
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(authHeader,SECRET);
    } catch (err) {
        err.statusCode= 500;
        throw err;
    }
    if(!decodedToken) {
        const error =  new Error('Acesso não autorizado!');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}