const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateRequest } = require("../validate");
const {
  loadRequests,
  newRequest,
  updateRequest,
} = require("../controllers/request");

router.route("/").get(protect, loadRequests);

router.route("/:id").post(protect, newRequest);

router.route("/:requestId").patch(protect, updateRequest);

module.exports = router;
