const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const Auth = require('./routes/auth');
const PORT = process.env.PORT || 1337;
const routes = require('./routes/routes');
const dbUrl = 'mongodb://localhost:27017/treino';
const multer = require('multer');
const uuidv4 = require('uuidv4');

//Initiating app
const app = express();
     
const fileStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4())
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimeType === 'image/pgn' || 
        file.mimeType === 'image/jpg' || 
        file.mimeType === 'image/jpeg' 
        ) {
            cb(null,true);
        }else{
            cb(null, false);
        }
}

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

//Config app
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());

//routes
app.use(routes);
app.use('/auth',Auth);

//error Handler
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const msg = error.message;
    const data = error.data;
    res.status(status).json({ message: msg, data: data });
});


//intialize the server app and connect with mongoDb atlas database
mongoose
    .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(PORT);
        console.log(`Connected MongoDB: ${dbUrl}`)
        console.log(`Connected Server on: http://localhost:1337/`)
    })
    .catch(err => {
        console.log(err);
    });
requireDir("./models");

const user = mongoose.model('User');
//app routes





