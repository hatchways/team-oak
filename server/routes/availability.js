const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateSchedule } = require("../validate");
const {
  createSchedule,
  updateSchedule,
  activeSchedule,
  getAllSchedules,
  activateSchedule,
} = require("../controllers/availability");

router.route("/schedule/new").post(protect, validateSchedule, createSchedule);

router.route("/schedule/:scheduleId").put(protect, validateSchedule, updateSchedule);

router.route("/schedule/active").get(protect, activeSchedule);

router.route("/schedule").get(protect, getAllSchedules);

router.route("/schedule/:scheduleId/activate").put(protect, activateSchedule);

module.exports = router;
