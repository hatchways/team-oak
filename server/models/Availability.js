const mongoose = require("mongoose");
const Schedule = require("./Schedule");

const availabilitySchema = new mongoose.Schema({
  schedules: [Schedule]
});

module.exports = Availability = mongoose.model("Availability", availabilitySchema);
