const mongoose = require("mongoose");

const periodSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
});

module.exports = Period = mongoose.model("Period", periodSchema);
