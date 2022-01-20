const mongoose = require("mongoose");

function calculatePayment(hoursOfService, rate) {
  total = hoursOfService * rate;
  totalPayment = total + (total * 5) / 100;
  return totalPayment;
}

exports.paymentSchema = new mongoose.Schema({
  sitterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  rate: {
    type: String,
    default: "CAD",
  },
  hoursOfService: {
    type: Number,
    default: "",
  },
  totalPayment: {
    type: Number,
    default: calculatePayment(hoursOfService, rate),
  },
  customerId: {
    type: String,
    default: "",
  },
});
