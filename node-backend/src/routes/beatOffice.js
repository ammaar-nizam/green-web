const router = require("express").Router();
const beatOfficeController = require('../controllers/beatOfficeController');
const authorization = require('../middleware/authorization');

router.post("/", authorization.verifyTokenAndSuperAdmin, beatOfficeController.create);
router.get("/:id", authorization.verifyToken, beatOfficeController.getBeatOfficeById);
router.get("/branches/:id", authorization.verifyToken, beatOfficeController.getAllBeatOfficesByBranchId);
router.get("/", authorization.verifyToken, beatOfficeController.getAllBeatOffices);

module.exports = router;