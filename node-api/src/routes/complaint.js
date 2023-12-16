const router = require("express").Router();
const complaintController = require('../controllers/complaintController');
const authorization = require('../middleware/authorization');
const imageUploader = require('../middleware/image-uploader');

router.post("/", authorization.verifyToken, complaintController.upload, complaintController.create);
router.get("/my-complaints", authorization.verifyToken, complaintController.getAllComplaintsByPublicUserId);
router.get("/:id", authorization.verifyTokenAndAdmin, complaintController.getComplaintById);
router.get("/", authorization.verifyTokenAndAdmin, complaintController.getAllComplaints);
router.patch("/:id", authorization.verifyTokenAndAdmin, complaintController.updateComplaintById);
router.delete("/:id", authorization.verifyTokenAndAdmin, complaintController.deleteComplaintById);

module.exports = router;