const express = require("express");
const router = express.Router();
const { validateRegister, validateLogin } = require("../validate");
const protect = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  demoUser,
  loadUser,
  logoutUser,
} = require("../controllers/auth");

router.route("/register").post(validateRegister, registerUser);

router.route("/login").post(validateLogin, loginUser);

router.route("/demo").post(demoUser);

router.route("/user").get(protect, loadUser);

router.route("/logout").post(logoutUser);

module.exports = router;
