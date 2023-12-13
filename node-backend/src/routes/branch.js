const router = require("express").Router();
const branchController = require('../controllers/branchController');
const authorization = require('../middleware/authorization');

router.post("/", authorization.verifyTokenAndSuperAdmin, branchController.create);
router.get("/:id", authorization.verifyTokenAndAdmin, branchController.getBranchById);
router.get("/divisions/:id", authorization.verifyTokenAndAdmin, branchController.getAllBranchesByDivisionId);
router.get("/", authorization.verifyTokenAndAdmin, branchController.getAllBranches);

module.exports = router;