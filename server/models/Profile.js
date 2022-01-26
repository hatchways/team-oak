const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    address: {
      type: String,
      default: "",
    },
    telephone: {
      type: String,
      default: "",
    },
    birthday: {
      type: Date,
      default: null,
    },
    photo: {
      type: String,
      default: "",
    },
    stripeAccountId: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
    about: {
      type: String,
      default: "",
    },
    aboutImages: {
      type: [String],
      default: [],
    },
    backgroundPhoto: {
      type: String,
      default: "",
    },
    rate: {
      type: Number,
      default: 0,
    },
  },
  { discriminatorKey: "type" },
);

module.exports = Profile = mongoose.model("Profile", profileSchema);
