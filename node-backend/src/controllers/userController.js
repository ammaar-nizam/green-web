const models = require('../models');
const CryptoJS = require("crypto-js");

// Get public user by Id
function getPublicUserById(req, res){
    const id = req.params.id;
    models.PublicUser.findByPk(id).then((data) => {
        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json({
                message: "Public user not found"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving the public user."
        });
    });
}

// Get all public users
function getAllPublicUsers(req, res){
    models.PublicUser.findAll().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving all public users."
        });
    });
}

// Update public user by Id
function updatePublicUserById(req, res){
    const id = req.params.id;
    const updatedPublicUser = {
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
    models.PublicUser.update(updatedPublicUser, {where: {id: id}}).then((data) => {
        if(data){
            res.status(200).json({
                message: "Public user updated successfully.",
                publicUser: updatedPublicUser
            });
        }else{
            res.status(404).json({
                message: "Public user not found"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Error updating the public user."
        });
    });
}

// Delete public user by Id
function deletePublicUserById(req, res){
    const id = req.params.id;
    models.PublicUser.destroy({where: {id:id}}).then((data) => {
        if(data){
            res.status(200).json({
                message: "Public user deleted successfully."
            });
        }else{
            res.status(404).json({
                message: "Public user not found"
            });
        }      
    }).catch((err) => {
        res.status(500).json({
            message: "Error deleting the public user."
        });
    });
}

module.exports = {
    getPublicUserById, getAllPublicUsers, updatePublicUserById, deletePublicUserById
}