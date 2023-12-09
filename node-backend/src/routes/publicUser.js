const router = require("express").Router();
const userController = require('../controllers/userController');
const authorization = require('../middleware/authorization');

router.get("/:id", userController.getPublicUserById);
router.get("/", userController.getAllPublicUsers);
router.patch("/:id", authorization.verifyToken, userController.updatePublicUserById);
router.delete("/:id", authorization.verifyToken, userController.deletePublicUserById);

module.exports = router;