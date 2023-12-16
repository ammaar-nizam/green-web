const models = require('../models');
const multer = require('multer')
const path = require('path')
const {validator, schemaForCheckingDescription} = require('../utils/validation');

// Create investigation
function create(req, res){
    const investigation = {
        description: req.body.description,
        complaintId: req.body.complaintId
    }
    // Validate user input
    const validationResponse = validator.validate(investigation, schemaForCheckingDescription);
    if(validationResponse !== true){
        res.status(400).json({
            message: "Validation failed.",
            errors: validationResponse
        });
    }else{
        models.Investigation.create(investigation).then((data) => {
            res.status(201).json({
                message: "Investigation created successfully.",
                investigation: data
            })
        }).catch((err) => {
            res.status(500).json({
                message: "Error creating the investigation.",
                error: err
            })
        });
    }  
}

// Get investigation by Investigation Id
function getInvestigationById(req, res){
    const id = req.params.id;
    models.Investigation.findByPk(id).then((data) => {
        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json({
                message: "Investigation not found"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving the investigation.",
            error: err
        });
    });
}

// Get investigations by Complaint Id
function getInvestigationByComplaintId(req, res){
    models.Investigation.findOne({
        where : {complaintId: req.body.complaintId}
    }).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving the investigation.",
            error: err
        });
    });
}

// Get investigations by Beat Officer Id
function getAllInvestigationsByBeatOfficerId(req, res){
    models.Investigation.findAll({
        where : {publicUserId: publicUserId}
    }).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving all investigations.",
            error: err
        });
    });
}
// Get all investigations
function getAllInvestigations(req, res){
    models.Investigation.findAll().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving all investigations.",
            error: err
        });
    });
}

// Update investigation by Id
function updateInvestigationById(req, res){
    const id = req.params.id;
    const updatedInvestigation = {
        description: req.body.description,
        evidence: req.file.filename
    }
    models.Investigation.update(updatedInvestigation, {where: {id: id}}).then((data) => {
        if(data){
            res.status(200).json({
                message: "Investigation updated successfully.",
                investigation: updatedInvestigation
            });
        }else{
            res.status(404).json({
                message: "Investigation not found"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Error updating the investigation.",
            error: err
        });
    });
}

// Delete investigation by Id
function deleteInvestigationById(req, res){
    const id = req.params.id;
    models.Investigation.destroy({where: {id:id}}).then((data) => {
        if(data){
            res.status(200).json({
                message: "Investigation deleted successfully."
            });
        }else{
            res.status(404).json({
                message: "Investigation not found"
            });
        }      
    }).catch((err) => {
        res.status(500).json({
            message: "Error deleting the investigation.",
            error: err
        });
    });
}

// Middleware using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('file');

module.exports = {
    create, upload, getInvestigationById, getInvestigationByComplaintId, getAllInvestigations, getAllInvestigationsByBeatOfficerId, 
    updateInvestigationById, deleteInvestigationById
}