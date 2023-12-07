const User = require("../models/User");
const userController = require('../controllers/userController')
const CryptoJS = require("crypto-js");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/authorization");

const router = require("express").Router();

router.get("/", userController.index);

module.exports = router

