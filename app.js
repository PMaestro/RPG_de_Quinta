const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const PORT = process.env.PORT || 1337;
const routes = require('./routes/routes');
const dbUrl = 'mongodb://localhost:27017/treino';

//Initiating app
const app = express();
app.use(express.json());

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
app.use(routes);




