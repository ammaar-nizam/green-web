const router = require("express").Router(); 
const institutionController = require('../controllers/institutionController'); 
const authorization = require('../middleware/authorization'); 

router.post("/", authorization.verifyTokenAndSuperAdmin, institutionController.create); 
router.get("/find/:id", authorization.verifyToken, institutionController.getInstitutionById); 
router.get("/", authorization.verifyToken, institutionController.getAllInstitutions); 
router.get("/stats/:id", authorization.verifyTokenAndAdmin, institutionController.countComplaintsPerEachInstitution); 

module.exports = router; 