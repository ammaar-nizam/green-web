const router = require("express").Router();
const institutionController = require('../controllers/institutionController');
const authorization = require('../middleware/authorization');

router.post("/", authorization.verifyTokenAndSuperAdmin, institutionController.create);
router.get("/:id", authorization.verifyToken, institutionController.getInstitutionById);
router.get("/", authorization.verifyToken, institutionController.getAllInstitutions);

module.exports = router;