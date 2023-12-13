const models = require('../models');
const {validator, schemaForInstitutionAndDivisionAndBranch} = require('../utils/validation');

// Create division
function create(req, res){
    const division = {
        name: req.body.name
    }
    // Validate user input
    const validationResponse = validator.validate(division, schemaForInstitutionAndDivisionAndBranch);
    if(validationResponse !== true){
        res.status(400).json({
            message: "Validation failed.",
            errors: validationResponse
        });
    }else{
        models.Division.findOne({where: {name:req.body.name} }).then((data) => {
            if(data){
                res.status(409).json({
                    message: "A Division already exists with the same name."
                });
            } else{
                models.Division.create(division).then((data) => {
                    res.status(201).json({
                        message: "Division created successfully.",
                        division: data
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: "Error creating the division.",
                        error: err
                    })
                });
            }
        }).catch((err) => {
            res.status(500).json({
                message: "Error creating the division.",
                error: err
            })
        });
    }  
}

// Get a division by Id
function getDivisionById(req, res){
    const id = req.params.id;
    models.Division.findByPk(id).then((data) => {
        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json({
                message: "Division not found"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving the division."
        });
    });
}

// Get all divisions
function getAllDivisions(req, res){
    models.Division.findAll().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving all divisions."
        });
    });
}

//Get divisions that belong to a given institution (i.e., Wildlife or Forestry and Environmental)
function getAllDivisionsByInstitutionId(req, res){
    models.Division.findAll().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving all divisions that belong to the institution."
        });
    });
}

module.exports = {create, getDivisionById, getAllDivisions, getAllDivisionsByInstitutionId}