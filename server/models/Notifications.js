const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  senderPhoto: {
    type: String,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["app", "booking", "user"],
  },
  description: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  date: {
    month: {
      type: Number,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
});

module.exports = Notifications = mongoose.model("Notifications", notificationsSchema);
