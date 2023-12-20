const registrationController = require('../controllers/registrationController')

const router = require("express").Router();

router.post("/register", registrationController.registerAsPublicUser);
router.post("/login", registrationController.loginAsPublicUser);

module.exports = router;

