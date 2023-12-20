const router = require("express").Router(); 
const investigationController = require('../controllers/investigationController');
const authorization = require('../middleware/authorization');

// get routes
router.get("/", authorization.verifyTokenAndAdmin, investigationController.getAllInvestigations);

// post routes
router.post("/", authorization.verifyTokenAndAdmin, investigationController.upload, investigationController.create);

module.exports = router; 