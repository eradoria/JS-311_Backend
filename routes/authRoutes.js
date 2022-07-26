const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/login", authController.authlogin);

router.post("/signup", authController.authsignup);

module.exports = router;