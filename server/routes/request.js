const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  loadRequests,
  newRequest,
  updateRequest,
} = require("../controllers/request");

router.route("/load").put(protect, loadRequests);

router.route("/new").get(newRequest);

router.route("/update").get(protect, updateRequest);

module.exports = router;
