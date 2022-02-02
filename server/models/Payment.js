const mongoose = require("mongoose");

const structures = { toJSON: { virtuals: true } };

const paymentSchema = new mongoose.Schema(
  {
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
      type: Number,
      required: true,
    },
    hoursOfService: {
      type: Number,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  structures
);

paymentSchema.virtual("totalPayment").get(function () {
  return this.hoursOfService * this.rate + 5;
});

module.exports = Payment = mongoose.model("Payment", paymentSchema);
