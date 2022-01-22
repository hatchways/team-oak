const mongoose = require("mongoose");
const calculatePayment = function (hoursOfService, rate) {
  total = hoursOfService * rate;
  totalPayment = total + (total * 5) / 100;
  return totalPayment;
};

const paymentSchema = new mongoose.Schema({
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

module.exports = Payment = mongoose.model("Payment", paymentSchema);
