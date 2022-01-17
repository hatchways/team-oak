
const mongoose = require("mongoose");
const Period = require("./Period");

const scheduleSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    required: true
  },
  periods: {
    monday: [Period],
    tuesday: [Period],
    wednesday: [Period],
    thursday: [Period],
    friday: [Period],
    satruday: [Period],
    sunday: [Period],
  },
});

module.exports = Schedule = mongoose.model("Schedule", scheduleSchema);
