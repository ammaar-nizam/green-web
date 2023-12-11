const router = require("express").Router();
const beatOfficerController = require('../controllers/beatOfficerController');
const authorization = require('../middleware/authorization');

router.post("/", authorization.verifyTokenAndAdmin, beatOfficerController.create);
// router.post("/login", registrationController.loginAsPublicUser);
router.get("/:id", authorization.verifyTokenAndAdmin, beatOfficerController.getBeatOfficerById);
router.get("/", authorization.verifyTokenAndAdmin, beatOfficerController.getAllBeatOfficers);
router.patch("/:id", authorization.verifyTokenAndAdmin, beatOfficerController.updateBeatOfficerById);
router.delete("/:id", authorization.verifyTokenAndAdmin, beatOfficerController.deleteBeatOfficerById);

module.exports = router;