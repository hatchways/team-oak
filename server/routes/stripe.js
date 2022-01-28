const express = require("express");
const protect = require("../middleware/auth");
const router = express.Router();
const {
  createUser,
} = require("../controllers/stripe");

router.route("/stripe").get(protect, createUser);

module.exports = router;
