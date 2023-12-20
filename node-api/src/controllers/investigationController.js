const models = require('../models');
const { validator, schemaForCheckingDescription } = require('../utils/validation');


// Get all investigations
function getAllInvestigations(req, res) {
    models.Investigation.findAll().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving all investigations.",
            error: err
        });
    });
}

// Get investigation by Investigation Id
function getInvestigationById(req, res) {
    const id = req.params.id;
    models.Investigation.findByPk(id).then((data) => {
        if (data) {
            res.status(200).json(data);
        } else {
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
function getInvestigationByComplaintId(req, res) {
    models.Investigation.findOne({
        where: { complaintId: req.body.complaintId }
    }).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving the investigation.",
            error: err
        });
    });
}

// Create investigation
function create(req, res) {
    const investigation = {
        description: req.body.description,
        complaintId: req.body.complaintId
    }
    // Validate user input
    const validationResponse = validator.validate(investigation, schemaForCheckingDescription);
    if (validationResponse !== true) {
        res.status(400).json({
            message: "Validation failed.",
            errors: validationResponse
        });
    } else {
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

module.exports = {
    create,
    getAllInvestigations,
    getInvestigationById,
    getInvestigationByComplaintId,
    
}