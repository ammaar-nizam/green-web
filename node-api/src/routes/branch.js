const router = require("express").Router();
const branchController = require('../controllers/branchController');
const authorization = require('../middleware/authorization');

router.post("/", authorization.verifyTokenAndSuperAdmin, branchController.create);
router.get("/:id", authorization.verifyToken, branchController.getBranchById);
router.get("/divisions/:id", authorization.verifyToken, branchController.getAllBranchesByDivisionId);
router.get("/", authorization.verifyToken, branchController.getAllBranches);

module.exports = router;
