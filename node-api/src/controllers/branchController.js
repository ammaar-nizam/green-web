const models = require('../models');
const {validator, schemaForInstitutionAndDivisionAndBranch} = require('../utils/validation');

// Create branch
function create(req, res){
    const branch = {
        name: req.body.name
    }
    // Validate user input
    const validationResponse = validator.validate(branch, schemaForInstitutionAndDivisionAndBranch);
    if(validationResponse !== true){
        res.status(400).json({
            message: "Validation failed.",
            errors: validationResponse
        });
    }else{
        models.Branch.findOne({where: {name:req.body.name} }).then((data) => {
            if(data){
                res.status(409).json({
                    message: "Branch already exists with the same name."
                });
            } else{
                models.Branch.create(branch).then((data) => {
                    res.status(201).json({
                        message: "Branch created successfully.",
                        branch: data
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: "Error creating the branch.",
                        error: err
                    })
                });
            }
        }).catch((err) => {
            res.status(500).json({
                message: "Error creating the branch.",
                error: err
            })
        });
    }  
}

// Get a branch by Id
function getBranchById(req, res){
    const id = req.params.id;
    models.Branch.findByPk(id).then((data) => {
        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json({
                message: "Branch not found"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving the branch.",
            error: err
        });
    });
}

// Get all branches
function getAllBranches(req, res){
    models.Branch.findAll().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving all branches.",
            error: err
        });
    });
}

// Sequelize raw query to get branches that belong to a given division
function getAllBranchesByDivisionId(req, res){
    const divisionId = req.params.id;
    const query = `
            SELECT b.name 
            FROM beatoffices bo
            LEFT JOIN branches b ON bo.branchId = b.id
            LEFT JOIN divisions d ON bo.divisionId = d.id
            LEFT JOIN institutions i ON bo.institutionId = i.id
            WHERE d.id = ?;
            `;
    models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: [divisionId]
    }).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving all branches for the given division.",
            error: err
        });
    });
}

// Sequelize raw query to count number of complaints in each branch
function countComplaintsPerEachBranch(req, res){
    const query = `
            SELECT c.beatOfficeId AS beatOfficeId, COUNT(c.id) AS totalPerBeatOffice
            FROM complaints c
            GROUP BY c.beatOfficeId;
            `;
    models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT
    }).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error counting complaints per beat office.",
            error: err
        });
    });
}

module.exports = {create, getBranchById, getAllBranches, getAllBranchesByDivisionId,
    countComplaintsPerEachBranch
}