const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  loadRequests,
  newRequest,
  updateRequest,
} = require("../controllers/request");

router.route("/load").get(protect, loadRequests);

router.route("/new").post(newRequest);

router.route("/update").patch(protect, updateRequest);

module.exports = router;
