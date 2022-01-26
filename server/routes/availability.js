const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateSchedule } = require("../validate");
const {
  createSchedule,
  activeSchedule,
  getAllSchedules,
  activateSchedule,
} = require("../controllers/availability");

router.route("/schedule/:scheduleId").post(protect, validateSchedule, createSchedule);

router.route("/schedule/active").get(protect, activeSchedule);

router.route("/schedule").get(protect, getAllSchedules);

router.route("/schedule/:scheduleId/activate").post(protect, activateSchedule);

module.exports = router;
