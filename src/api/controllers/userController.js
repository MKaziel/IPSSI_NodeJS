const User = require('../models/userModel');

const jwt = require('jsonwebtoken');
const Bcrypt = require('bcrypt');
const SaltRounds = 10;

exports.create_an_user = (req, res) => {
    let rgx = new RegExp('^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$');
    if(rgx.test(req.body.email)){
        Bcrypt.hash(req.body.password,SaltRounds,(err,hash)=>{
            if(!err){
                let new_user = new User({
                    ...req.body,
                    password : hash
                });
                new_user.save((error, user) => {
                    if (error) {
                        res.status(500);
                        console.log(error);
                        res.json({
                            message: "Erreur serveur."
                        })
                    } else {
                        res.status(201);
                        res.json({
                            message: `Utilisateur crée : ${user.email}`
                        })
                    }
                })
            } else {
                res.status(500);
                console.log(error);
                res.json({
                    message: "Erreur serveur."
                })
            }
        })
    } else {
        res.status(400);
        console.log(err);
        res.json({
            message: "Invalid Credential given !"
        });
    }
}

exports.login_an_user = (req, res) => {
    console.log(req.body);
    let rgx = new RegExp('^[^\\W][a-zA-Z0-9_]+(\\.[a-zA-Z0-9_]+)*\\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\\.[a-zA-Z]{2,4}$');
    if(rgx.test(req.body.email)){
        User.findOne({
            email: req.body.email
        }, (error, user) => {
            if (error) {
                res.status(500);
                console.log(error);
                res.json({
                    message: "Erreur serveur."
                })
            } else if (user !== null) {            
                Bcrypt.compare(req.body.password,user.password,(err,rslt)=>{
                    if(!err && rslt){
                        jwt.sign({
                            email: user.email,
                            role: "user"
                        }, process.env.JWT_SECRET, {
                            expiresIn: '30 days'
                        }, (error, token) => {
                            if (error) {
                                res.status(400);
                                console.log(error);
                                res.json({
                                    message: "Invalid Credential given !"
                                });
                            } else {
                                res.json({
                                    myToken : token
                                });
                            }
                        });
                    } else {
                        res.status(400);
                        console.log(err);
                        res.json({
                            message: "Invalid Credential given !"
                        });
                    }
                });
            } else {
                res.status(400);
                console.log(error);
                res.json({
                    message: "User not found !"
                });
            }
        })
    } else {
        res.status(400);
        console.log(req.body);
        res.json({
            message: "Invalid Credential given !"
        });
    }
}