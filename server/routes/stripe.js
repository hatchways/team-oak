const express = require("express");
const protect = require("../middleware/auth");
const router = express.Router();
const {
  createUser,
  createCustomer,
} = require("../controllers/stripe");

router.route("/stripe").get(protect, createUser);
router.route("/newCustomer").get(protect, createCustomer);

module.exports = router;
