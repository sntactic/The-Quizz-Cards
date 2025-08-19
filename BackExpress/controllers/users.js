const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email : req.body.email,
            name : req.body.name,
            password : hash
        });
        user.save()
        .then(() => {
            res.status(201).json({message : "utilisateur enrigistrer dans la base"});
            console.log('user signined');
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
};

exports.signin = (req, res, next) => {
    console.log(req.body)
    User.findOne({email : req.body.email})
    .then(user =>{
        if(user === null){
            res.status(401).json({message : 'user not exist'});
        }
        else{
            bcrypt.compare(req.body.password , user.password)
            .then(valid => {
                if(!valid){
                    res.status(401).json({message : 'mot de passe incorrect!'});
                }
                else{
                    res.status(200).json({
                        user : {
                            name: user.name,
                            email: user.email
                        },
                        token : jwt.sign(
                            {
                                userID : user._id,
                                name: user.name,
                                email: user.email
                            },
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn : '24h'}
                        )
                    });
                };
            })
            .catch(error => res.status(500).json({error}))
        };
    })
    .catch(error => {res.status(500).json({error})})
};