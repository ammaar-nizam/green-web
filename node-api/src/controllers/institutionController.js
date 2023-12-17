const models = require('../models');
const {validator, schemaForInstitutionAndDivisionAndBranch} = require('../utils/validation');

// Create institution
function create(req, res){
    const institution = {
        name: req.body.name
    }
    // Validate user input
    const validationResponse = validator.validate(institution, schemaForInstitutionAndDivisionAndBranch);
    if(validationResponse !== true){
        res.status(400).json({
            message: "Validation failed.",
            errors: validationResponse
        });
    }else{
        models.Institution.findOne({where: {name:req.body.name} }).then((data) => {
            if(data){
                res.status(409).json({
                    message: "An Institution already exists with the same name."
                });
            } else{
                models.Institution.create(institution).then((data) => {
                    res.status(201).json({
                        message: "Institution created successfully.",
                        institution: data
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: "Error creating the institution.",
                        error: err
                    })
                });
            }
        }).catch((err) => {
            res.status(500).json({
                message: "Error creating the institution.",
                error: err
            })
        });
    }  
}

// Get an institution by Id
function getInstitutionById(req, res){
    const id = req.params.id;
    models.Institution.findByPk(id).then((data) => {
        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json({
                message: "Institution not found"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving the institution.",
            error: err
        });
    });
}

// Get all institutions
function getAllInstitutions(req, res){
    models.Institution.findAll({}).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving all institutions.",
            error: err
        });
    });
}

// Sequelize raw query to count number of complaints in each institution
function countComplaintsPerEachInstitution(req, res){
    const institutionId = req.params.id;
    const query = `
        SELECT count(complaints.id) AS 'Total Complaints' FROM complaints 
        WHERE complaints.beatOfficeId = ANY 
        (SELECT DISTINCT beatoffices.id FROM beatoffices WHERE beatoffices.institutionId = ? );
            `;
    models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: [institutionId]
    }).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error counting complaints per beat office.",
            error: err
        });
    });
}

module.exports = {create, getInstitutionById, getAllInstitutions, countComplaintsPerEachInstitution}