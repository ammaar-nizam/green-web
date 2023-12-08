const models = require('../models');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Validator = require('fastest-validator');

// Define a schema to validate the user input
const schema = {    
    name: {type: "string", optional: false, max: "100", pattern: /^[A-Za-z\s]+$/, message: {
        optional: "NIC cannot be empty",
        max: "Name cannot exceed 100 characters.",
        pattern: "Name must not have digits or special characters."
    }},
    nic: {type: "string", optional: false, pattern: /^(?:\d{12}|\d{9}[Vv])$/, message: {
        optional: "NIC cannot be empty",
        pattern: "NIC must be either 9 digits followed by a V or 12 digits."
    } },
    username: {type: "string", optional: false, max: "20", pattern: /^[^\d\s]+$/, message: {
        optional: "NIC cannot be empty",
        max: "Username cannot exceed 20 characters.",
        pattern: "Username must not have spaces, digits or special characters."
    }},
    email: {type: "string", optional: false, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: {
        optional: "NIC cannot be empty",
        pattern: "Email format is not valid."
    } },
    mobile: { type: "string", optional: false, pattern: /^\d{9,10}$/, message: {
        optional: "NIC cannot be empty",
        pattern: "Mobile must have 9 or 10 digits."
    } }
}

const validator = new Validator();

// Registering as a public user
function registerAsPublicUser(req, res){
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
    // Validate user input
    const validationResponse = validator.validate(publicUser, schema);
    if(validationResponse !== true){
        res.status(400).json({
            message: "Validation failed.",
            errors: validationResponse
        });
    }else{
        models.PublicUser.findOne({where: {nic:req.body.nic}}).then((data) => {
            if(data){
                res.status(409).json({
                    message: "A user already exists with the same NIC number."
                });
            } else{
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
}

// Logging in as a public user
function loginAsPublicUser(req, res){
    models.PublicUser.findOne({where: {username: req.body.username}}).then((publicUser) => {
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