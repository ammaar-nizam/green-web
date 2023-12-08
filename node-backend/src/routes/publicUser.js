const router = require("express").Router();
const userController = require('../controllers/userController');

router.get("/:id", userController.getPublicUserById);
router.get("/", userController.getAllPublicUsers);
router.patch("/:id", userController.updatePublicUserById);
router.delete("/:id", userController.deletePublicUserById);

module.exports = router;