const router = require("express").Router();
const publicUserController = require('../controllers/publicUserController');
const authorization = require('../middleware/authorization');

router.get("/:id", authorization.verifyTokenAndAdmin, publicUserController.getPublicUserById);
router.get("/:name", authorization.verifyTokenAndAdmin, publicUserController.getPublicUserByName);
router.get("/", authorization.verifyTokenAndAdmin, publicUserController.getAllPublicUsers);
router.patch("/:id", authorization.verifyTokenAndAdmin, publicUserController.updatePublicUserById);
router.delete("/:id", authorization.verifyTokenAndAdmin, publicUserController.deletePublicUserById);

module.exports = router;