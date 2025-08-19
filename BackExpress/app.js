const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const answerRouter = require('./routes/answer');


mongoose.connect('mongodb+srv://khadim_ahmad_mbaye:KHmb2494QuizzCards@cluster0.6w6rsgf.mongodb.net/quizzcards?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connection à MongoDB réussie.'))
    .catch(() => console.log('Connection à MongoDB échoue!'))


const app = express();

    app.use(express.json());
    app.use(bodyParser.json());

    app.use((req, res, next) => {
        console.log("request recieved!");
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    });

    //les routes
    app.use('/cards' , cardsRouter)
    app.use('/users' , usersRouter)
    app.use('/answer' , answerRouter)

module.exports = app ;
