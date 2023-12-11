const router = require("express").Router();
const adminController = require('../controllers/adminController');
const authorization = require('../middleware/authorization');

router.post("/", adminController.create);
router.post("/login", adminController.login);
router.get("/:id", adminController.getAdminById);
router.get("/", adminController.getAllAdmins);
router.patch("/:id", authorization.verifyToken, adminController.updateAdminById);
router.delete("/:id", authorization.verifyToken, adminController.deleteAdminById);

module.exports = router;