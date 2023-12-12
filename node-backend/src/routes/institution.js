const router = require("express").Router();
const institutionController = require('../controllers/institutionController');
const authorization = require('../middleware/authorization');

router.post("/", authorization.verifyTokenAndSuperAdmin, institutionController.create);
router.get("/:id", authorization.verifyTokenAndSuperAdmin, institutionController.getInstitutionById);
router.get("/", authorization.verifyTokenAndSuperAdmin, institutionController.getAllInstitutions);

module.exports = router;