const router = require("express").Router();
const adminController = require('../controllers/adminController');
const authorization = require('../middleware/authorization');

router.post("/", authorization.verifyTokenAndSuperAdmin, adminController.create);
router.post("/login", adminController.login);
router.get("/:id", authorization.verifyTokenAndSuperAdmin, adminController.getAdminById);
router.get("/", authorization.verifyTokenAndSuperAdmin, adminController.getAllAdmins);
router.patch("/:id", authorization.verifyTokenAndSuperAdmin, adminController.updateAdminById);
router.delete("/:id", authorization.verifyTokenAndSuperAdmin, adminController.deleteAdminById);

module.exports = router;