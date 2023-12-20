const router = require("express").Router(); 
const complaintController = require('../controllers/complaintController');  
const authorization = require('../middleware/authorization');

router.post("/", authorization.verifyToken, complaintController.upload, complaintController.create);   
router.get("/my-complaints", authorization.verifyToken, complaintController.getAllComplaintsByPublicUserId);
router.patch("/:id", authorization.verifyTokenAndAdmin, complaintController.updateComplaintById);  

module.exports = router;  