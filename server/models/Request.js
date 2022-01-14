const mongoose = require("mongoose");
const { addressSchema } = require("./Address");

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  sitterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  accepted: {
    type: Boolean,
    required: true,
    default: false,
  },
  declined: {
    type: Boolean,
    required: true,
    default: false,
  },
  paid: {
    type: Boolean,
    required: true,
    default: false,
  },
  address: addressSchema,
});

module.exports = Request = mongoose.model("Request", requestSchema);
