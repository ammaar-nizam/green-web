const router = require("express").Router(); 
const investigationController = require('../controllers/investigationController');
const authorization = require('../middleware/authorization');

// get routes
router.get("/", authorization.verifyTokenAndAdmin, investigationController.getAllInvestigations);
router.get("/:id", authorization.verifyTokenAndAdmin, investigationController.getInvestigationById);
router.get("/complaints/:id", authorization.verifyTokenAndBeatOfficer, investigationController.getInvestigationByComplaintId);

// post routes
router.post("/", authorization.verifyTokenAndAdmin, investigationController.upload, investigationController.create);

// patch route
router.patch("/:id", authorization.verifyTokenAndBeatOfficer, investigationController.updateInvestigationById);



module.exports = router; 