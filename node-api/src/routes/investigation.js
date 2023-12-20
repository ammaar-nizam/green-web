const router = require("express").Router(); 
const investigationController = require('../controllers/investigationController');
const authorization = require('../middleware/authorization');

router.post("/", authorization.verifyTokenAndAdmin, investigationController.upload, investigationController.create);

module.exports = router; 