const router = require("express").Router();
const investigationController = require('../controllers/investigationController');
const authorization = require('../middleware/authorization');
const imageUploader = require('../middleware/image-uploader');

router.post("/", authorization.verifyTokenAndAdmin, investigationController.upload, investigationController.create);
router.get("/complaints/:id", authorization.verifyTokenAndBeatOfficer, 
                investigationController.getInvestigationByComplaintId);
router.get("/:id", authorization.verifyTokenAndAdmin, investigationController.getInvestigationById);
router.get("/", authorization.verifyTokenAndAdmin, investigationController.getAllInvestigations);
router.patch("/:id", authorization.verifyTokenAndBeatOfficer, investigationController.updateInvestigationById);
router.delete("/:id", authorization.verifyTokenAndAdmin, investigationController.deleteInvestigationById);

module.exports = router;