const mongoose = require("mongoose");

exports.addressSchema = new mongoose.Schema({
  pickup: {
    type: String,
    required: true,
    default: null,
  },
  service: {
    type: String,
    required: true,
    default: null,
  },
  dropoff: {
    type: String,
    default: function () {
      if (this.pickup) {
        return this.pickup;
      }

      return null;
    },
  },
});
