const models = require('../models');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const {validator, schemaForBeatOfficerAndAdmin} = require('../utils/validation');

// Create beat officer
function create(req, res){
    const beatOfficer = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_SECRET_KEY
          ).toString(),
        roleId: 3,
        beatOfficeId: 1
    }
    // Validate user input
    const validationResponse = validator.validate(beatOfficer, schemaForBeatOfficerAndAdmin);
    if(validationResponse !== true){
        res.status(400).json({
            message: "Validation failed.",
            errors: validationResponse
        });
    }else{
        models.BeatOfficer.findOne({where: {username:req.body.username} && {email: req.body.email} }).then((data) => {
            if(data){
                res.status(409).json({
                    message: "A user already exists with the same username or email."
                });
            } else{
                models.BeatOfficer.create(beatOfficer).then((data) => {
                    res.status(201).json({
                        message: "Beat officer created successfully.",
                        beatOfficer: data
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: "Error creating the beat officer.",
                        error: err
                    })
                });
            }
        }).catch((err) => {
            res.status(500).json({
                message: "Error creating the beat officer.",
                error: err
            })
        });
    }  
}

// Logging in as a beat officer
function login(req, res){
    models.BeatOfficer.findOne({where: {username: req.body.username, email:req.body.email}}).then((beatOfficer) => {
        if(beatOfficer === null){
            res.status(401).json({
                message: "Either incorrect username or email."
            });
        }else{
            const hashedPassword = CryptoJS.AES.decrypt(
                beatOfficer.password,
                process.env.PASSWORD_SECRET_KEY
              );
              const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
          
              OriginalPassword !== req.body.password &&
                res.status(401).json("Incorrect password.");
          
              const accessToken = jwt.sign(
                {
                    id: beatOfficer.id,
                    email: beatOfficer.email,
                    roleId: beatOfficer.roleId
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '30m' },
                function(err, accessToken){
                    res.status(200).json({
                        message: "Authentication successful and logged in as a beat officer.",
                        accessToken: accessToken
                    });
                }
              );
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Error logging in as a beat officer.",
            error: err
        })
    })
}

// Get beat officer by Id
function getBeatOfficerById(req, res){
    const id = req.params.id;
    models.BeatOfficer.findByPk(id).then((data) => {
        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json({
                message: "Beat officer not found"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving the beat officer."
        });
    });
}

// Get all beat officers
function getAllBeatOfficers(req, res){
    models.BeatOfficer.findAll().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving all beat officers."
        });
    });
}

// Update beat officer by Id
function updateBeatOfficerById(req, res){
    const id = req.params.id;
    const updatedBeatOfficer = {
        name: req.body.name,
        nic: req.body.nic,
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_SECRET_KEY
          ).toString()
    }
    models.BeatOfficer.update(updatedBeatOfficer, {where: {id: id}}).then((data) => {
        if(data){
            res.status(200).json({
                message: "Beat officer updated successfully.",
                beatOfficer: updatedBeatOfficer
            });
        }else{
            res.status(404).json({
                message: "Beat officer not found"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Error updating the beat officer."
        });
    });
}

// Delete beat officer by Id
function deleteBeatOfficerById(req, res){
    const id = req.params.id;
    models.BeatOfficer.destroy({where: {id:id}}).then((data) => {
        if(data){
            res.status(200).json({
                message: "Beat officer deleted successfully."
            });
        }else{
            res.status(404).json({
                message: "Beat officer not found"
            });
        }      
    }).catch((err) => {
        res.status(500).json({
            message: "Error deleting the beat officer."
        });
    });
}

module.exports = {
    create, login, getBeatOfficerById, getAllBeatOfficers, updateBeatOfficerById, deleteBeatOfficerById
}