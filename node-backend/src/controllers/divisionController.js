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
            message: "Error retrieving the division.",
            error: err
        });
    });
}

// Get all divisions
function getAllDivisions(req, res){
    models.Division.findAll().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving all divisions.",
            error: err
        });
    });
}

// Sequelize raw query to get divisions that belong to a given institution (i.e., Wildlife or Forestry and Environmental)
async function getAllDivisionsByInstitutionIdRawQuery(institutionId){
    try{
        const query = `
        SELECT DISTINCT d.name 
        FROM beatoffices bo
        LEFT JOIN divisions d ON bo.divisionId = d.id
        LEFT JOIN institutions i ON bo.institutionId = i.id
        WHERE i.id = :id;
      `;
      const divisions = sequelize.query(query, {
          type: QueryTypes.SELECT,
          replacements: { institutionId },
        });
      return divisions;
    }catch(err){
        throw new Error(`Error executing query: ${err}`);
    }
}

// Using the above raw query method
async function getAllDivisionsByInstitutionId(req, res){
    try {
        const divisionNames = await getAllDivisionsByInstitutionIdRawQuery(req.params.id);
        res.status(200).json({ divisionNames });
      } catch (err) {
        res.status(500).json({ 
            message: "Error retrieving all divisions for the given institution.",
            error: err 
        });
      }
}

module.exports = {create, getDivisionById, getAllDivisions, getAllDivisionsByInstitutionId}