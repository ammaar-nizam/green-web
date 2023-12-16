const router = require("express").Router();
const divisionController = require('../controllers/divisionController');
const authorization = require('../middleware/authorization');

router.post("/", authorization.verifyTokenAndSuperAdmin, divisionController.create);
router.get("/:id", authorization.verifyToken, divisionController.getDivisionById);
router.get("/institutions/:id", authorization.verifyToken, divisionController.getAllDivisionsByInstitutionId);
router.get("/", authorization.verifyToken, divisionController.getAllDivisions);

module.exports = router;