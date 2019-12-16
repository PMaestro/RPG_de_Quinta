const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const PORT = process.env.PORT || 1337;
const routes = require('./routes/routes');
const dbUrl = 'mongodb://localhost:27017/treino';

//Initiating app
const app = express();
app.use('/images',express.static(path.join(__dirname,'images')));
app.use(express.json());

//routes
app.use(routes);

//error Handler
app.use((error, req, res,next)=>{
    console.log(error);
    const status = error.statusCode || 500; 
    const msg = error.message;
    res.status(status).json({message: msg});
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





