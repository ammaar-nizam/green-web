const models = require('../models');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Registering as a public user
function registerAsPublicUser(req, res){
    models.PublicUser.findOne({where: {nic:req.body.nic}}).then((data) => {
        if(data){
            res.status(409).json({
                message: "A user already exists with the same NIC number."
            });
        } else{
            const publicUser = {
                name: req.body.name,
                nic: req.body.nic,
                username: req.body.username,
                email: req.body.email,
                mobile: req.body.mobile,
                password: CryptoJS.AES.encrypt(
                    req.body.password,
                    process.env.PASSWORD_SECRET_KEY
                  ).toString(),
                roleId: 1
            }
            models.PublicUser.create(publicUser).then((data) => {
                res.status(201).json({
                    message: "Public user created successfully.",
                    publicUser: data
                })
            }).catch((err) => {
                res.status(500).json({
                    message: "Error creating the public user.",
                    error: err
                })
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Error creating the public user.",
            error: err
        })
    });
}

// Logging in as a public user
function loginAsPublicUser(req, res){
    models.PublicUser.findOne({where: {email: req.body.email}}).then((publicUser) => {
        if(publicUser === null){
            res.status(401).json({
                message: "No such user exists."
            });
        }else{
            const hashedPassword = CryptoJS.AES.decrypt(
                publicUser.password,
                process.env.PASSWORD_SECRET_KEY
              );
              const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
          
              OriginalPassword !== req.body.password &&
                res.status(401).json("Incorrect password.");
          
              const accessToken = jwt.sign(
                {
                    id: publicUser.id,
                    email: publicUser.email
                },
                process.env.JWT_SECRET_KEY,
                function(err, accessToken){
                    res.status(200).json({
                        message: "Authentication successful and logged in as a public user.",
                        accessToken: accessToken
                    });
                }
              );
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Error logging in as public user.",
            error: err
        })
    })
}

module.exports = {
    registerAsPublicUser, loginAsPublicUser
}