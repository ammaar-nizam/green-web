const models = require('../models');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const {validator, schemaForBeatOfficerAndAdmin} = require('../utils/validation');

// Create admin
function create(req, res){
    const admin = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_SECRET_KEY
          ).toString(),
        roleId: 2
    }
    // Validate user input
    const validationResponse = validator.validate(admin, schemaForBeatOfficerAndAdmin);
    if(validationResponse !== true){
        res.status(400).json({
            message: "Validation failed.",
            errors: validationResponse
        });
    }else{
        models.Admin.findOne({where: {username:req.body.username}}).then((data) => {
            if(data){
                res.status(409).json({
                    message: "A user already exists with the same username."
                });
            } else{
                models.Admin.create(admin).then((data) => {
                    res.status(201).json({
                        message: "Admin created successfully.",
                        admin: data
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: "Error creating the admin.",
                        error: err
                    })
                });
            }
        }).catch((err) => {
            res.status(500).json({
                message: "Error creating the admin.",
                error: err
            })
        });
    }  
}

// Logging in as an admin
function login(req, res){
    models.Admin.findOne({where: {username: req.body.username}}).then((admin) => {
        if(admin === null){
            res.status(401).json({
                message: "No such user exists."
            });
        }else{
            const hashedPassword = CryptoJS.AES.decrypt(
                admin.password,
                process.env.PASSWORD_SECRET_KEY
              );
              const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
          
              OriginalPassword !== req.body.password &&
                res.status(401).json("Incorrect password.");
          
              const accessToken = jwt.sign(
                {
                    id: admin.id,
                    email: admin.email,
                    roleId: admin.roleId
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1m' },
                function(err, accessToken){
                    res.status(200).json({
                        message: "Authentication successful and logged in as an admin.",
                        accessToken: accessToken
                    });
                }
              );
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Error logging in as an admin.",
            error: err
        })
    })
}

// Get admin by Id
function getAdminById(req, res){
    const id = req.params.id;
    models.Admin.findByPk(id).then((data) => {
        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json({
                message: "Admin not found"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving the admin."
        });
    });
}

// Get all admins
function getAllAdmins(req, res){
    models.Admin.findAll().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving all admins."
        });
    });
}

// Update admin by Id
function updateAdminById(req, res){
    const id = req.params.id;
    const updatedAdmin = {
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
    models.Admin.update(updatedAdmin, {where: {id: id}}).then((data) => {
        if(data){
            res.status(200).json({
                message: "Admin updated successfully.",
                admin: updatedAdmin
            });
        }else{
            res.status(404).json({
                message: "Admin not found"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Error updating the admin."
        });
    });
}

// Delete admin by Id
function deleteAdminById(req, res){
    const id = req.params.id;
    models.Admin.destroy({where: {id:id}}).then((data) => {
        if(data){
            res.status(200).json({
                message: "Admin deleted successfully."
            });
        }else{
            res.status(404).json({
                message: "Admin not found"
            });
        }      
    }).catch((err) => {
        res.status(500).json({
            message: "Error deleting the admin."
        });
    });
}

module.exports = {
    create, login, getAdminById, getAllAdmins, updateAdminById, deleteAdminById
}