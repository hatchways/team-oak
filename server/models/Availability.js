
const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  scheduleIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Schedule"
  },
  activeScheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule"
  },
});

module.exports = Availability = mongoose.model("Availability", availabilitySchema);
