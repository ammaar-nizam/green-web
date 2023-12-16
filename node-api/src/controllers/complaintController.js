const models = require('../models');
const multer = require('multer')
const path = require('path')
const {validator, schemaForCheckingDescription} = require('../utils/validation');

// Create complaint
function create(req, res){
   const complaint = {
        description: req.body.description,
        evidence: req.file.filename,
        location: req.body.location,
        beatOfficeId: req.body.beatOfficeId,
        status: 'NEW',
        publicUserId: req.user.id
    }
    // Validate user input
    const validationResponse = validator.validate(complaint, schemaForCheckingDescription);
    if(validationResponse !== true){
        res.status(400).json({
            message: "Validation failed.",
            errors: validationResponse
        });
    }else{
        models.Complaint.create(complaint).then((data) => {
            res.status(201).json({
                message: "Complaint created successfully.",
                complaint: data
            })
        }).catch((err) => {
            res.status(500).json({
                message: "Error creating the complaint.",
                error: err
            })
        });
    }  
}

// Get complaint by Complaint Id
function getComplaintById(req, res){
    const id = req.params.id;
    models.Complaint.findByPk(id).then((data) => {
        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json({
                message: "Complaint not found"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving the complaint.",
            error: err
        });
    });
}

// Get complaints by Public User Id
function getAllComplaintsByPublicUserId(req, res){
    const publicUserId = req.user.id;
    models.Complaint.findAll({
        where : {publicUserId: publicUserId}
    }).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving all complaints.",
            error: err
        });
    });
}

// Get all complaints
function getAllComplaints(req, res){
    models.Complaint.findAll().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving all complaints.",
            error: err
        });
    });
}

// Update complaint by Id
function updateComplaintById(req, res){
    const id = req.params.id;
    const updatedComplaint = {
        status: req.body.status,
        beatOfficerId: req.body.beatOfficerId,
        adminId: req.user.id,
        beatOfficeId: req.body.beatOfficeId,
    }
    models.Complaint.update(updatedComplaint, {where: {id: id}}).then((data) => {
        if(data){
            res.status(200).json({
                message: "Complaint updated successfully.",
                complaint: updatedComplaint
            });
        }else{
            res.status(404).json({
                message: "Complaint not found"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Error updating the complaint.",
            error: err
        });
    });
}

// Delete complaint by Id
function deleteComplaintById(req, res){
    const id = req.params.id;
    models.Complaint.destroy({where: {id:id}}).then((data) => {
        if(data){
            res.status(200).json({
                message: "Complaint deleted successfully."
            });
        }else{
            res.status(404).json({
                message: "Complaint not found"
            });
        }      
    }).catch((err) => {
        res.status(500).json({
            message: "Error deleting the complaint.",
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
    create, upload, getComplaintById, getAllComplaintsByPublicUserId, getAllComplaints, 
    updateComplaintById, deleteComplaintById
}