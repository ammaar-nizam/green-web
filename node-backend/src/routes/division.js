const router = require("express").Router();
const divisionController = require('../controllers/divisionController');
const authorization = require('../middleware/authorization');

router.post("/", authorization.verifyTokenAndSuperAdmin, divisionController.create);
router.get("/:id", authorization.verifyTokenAndAdmin, divisionController.getDivisionById);
router.get("/institutions/:id", authorization.verifyTokenAndAdmin, divisionController.getAllDivisionsByInstitutionId);
router.get("/", authorization.verifyTokenAndAdmin, divisionController.getAllDivisions);

module.exports = router;