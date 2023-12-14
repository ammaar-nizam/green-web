const models = require('../models');
const {validator, schemaForBeatOffice} = require('../utils/validation');

// Create beatOffice
function create(req, res){
    const beatOffice = {
        name: req.body.name,
        branchId: req.body.branchId,
        divisionId: req.body.divisionId,
        institutionId: req.body.institutionId
    }
    // Validate user input
    const validationResponse = validator.validate(beatOffice, schemaForBeatOffice);
    if(validationResponse !== true){
        res.status(400).json({
            message: "Validation failed.",
            errors: validationResponse
        });
    }else{
        models.BeatOffice.findOne({where: {name:req.body.name} }).then((data) => {
            if(data){
                res.status(409).json({
                    message: "A Beat Office already exists with the same name."
                });
            } else{
                models.BeatOffice.create(beatOffice).then((data) => {
                    res.status(201).json({
                        message: "Beat Office created successfully.",
                        beatOffice: data
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: "Error creating the beat office.",
                        error: err
                    })
                });
            }
        }).catch((err) => {
            res.status(500).json({
                message: "Error creating the beat office.",
                error: err
            })
        });
    }  
}

// Get an beatOffice by Id
function getBeatOfficeById(req, res){
    const id = req.params.id;
    models.BeatOffice.findByPk(id).then((data) => {
        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json({
                message: "Beat Office not found"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving the beat office.",
            error: err
        });
    });
}

// Get all beatOffices
function getAllBeatOffices(req, res){
    models.BeatOffice.findAll().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({
            message: "Error retrieving all beat offices.",
            error: err
        });
    });
}

// Sequelize raw query to get beat offices that belong to a given branch
async function getAllBeatOfficesByBranchIdRawQuery(branchId){
    try{
        const query = `
        SELECT DISTINCT bo.name 
        FROM beatoffices bo
        LEFT JOIN branches b ON bo.branchId = b.id
        LEFT JOIN divisions d ON bo.divisionId = d.id
        LEFT JOIN institutions i ON bo.institutionId = i.id
        WHERE b.id = :id;
      `;
      const beatOffices = sequelize.query(query, {
          type: QueryTypes.SELECT,
          replacements: { branchId },
        });
      return beatOffices;
    }catch(err){
        throw new Error(`Error executing query: ${err}`);
    }
}

// Using the above raw query method
async function getAllBeatOfficesByBranchId(req, res){
    try {
        const beatOfficesName = await getAllBeatOfficesByBranchIdRawQuery(req.params.id);
        res.status(200).json({ beatOfficesName });
      } catch (err) {
        res.status(500).json({ 
            message: "Error retrieving all beat offices for the given branch.",
            error: err
        });
      }
}

module.exports = {create, getBeatOfficeById, getAllBeatOffices, getAllBeatOfficesByBranchId}