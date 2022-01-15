const mongoose = require("mongoose");

exports.addressSchema = new mongoose.Schema({
  houseNumber: {
    type: String || Number,
    required: true,
    maxlength: 25,
  },
  street: {
    type: String,
    required: true,
    maxlength: 50,
  },
  district: {
    type: String,
    maxlength: 50,
  },
  city: {
    type: String,
    maxlength: 50,
    required: true,
  },
  county: {
    type: String,
    maxlength: 50,
  },
  postalCode: {
    type: String,
    maxlength: 7,
    required: true,
    validate: {
      validator: function (value) {
        // Allows: h2t-1b8; h2z 1b8; H2Z1B8
        // Disallows: Z2T 1B8 (leading Z); H2T 1O3 (contains O); Leading Z,W or to contain D, F, I, O, Q or U
        // Credit: https://stackoverflow.com/a/46761018
        return /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(
          value
        );
      },
      message: (props) => `${props.value} is not a valid postal code.`,
    },
  },
  country: {
    type: String,
    maxlength: 50,
    required: true,
  },
});
