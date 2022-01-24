const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Notifications = mongoose.model("Notifications", notificationsSchema);
