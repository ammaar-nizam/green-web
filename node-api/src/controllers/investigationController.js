const models = require('../models');
const { validator, schemaForCheckingDescription } = require('../utils/validation');

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
    create
}