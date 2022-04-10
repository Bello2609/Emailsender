const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

//login 
router.get("/login", authController.getLogin);

router.post("/postlogin", authController.postLogin);

//sign up
router.get("/signup", authController.getSignUp);

router.post("/signup", authController.postSignUp);

router.post("/logout", authController.postLogOut);

module.exports = router;