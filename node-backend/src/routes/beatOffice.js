const router = require("express").Router();
const beatOfficeController = require('../controllers/beatOfficeController');
const authorization = require('../middleware/authorization');

router.post("/", authorization.verifyTokenAndSuperAdmin, beatOfficeController.create);
router.get("/:id", authorization.verifyTokenAndAdmin, beatOfficeController.getBeatOfficeById);
router.get("/branches/:id", authorization.verifyTokenAndAdmin, beatOfficeController.getAllBeatOfficesByBranchId);
router.get("/", authorization.verifyTokenAndAdmin, beatOfficeController.getAllBeatOffices);

module.exports = router;