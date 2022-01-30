const Notification = require("../models/Notifications");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

const getSenderPhoto = asyncHandler(async (id) => {
  const senderProfile = await Profile.findOne({ userId: id });
  if (senderProfile) {
    return senderProfile.photo;
  } else {
    return "";
  }
});

// @route POST /notification/create
// @desc create new notification
// @access Private
exports.createNotification = asyncHandler(async (req, res, next) => {
  const { receiverId, title, type, description, read, date } = req.body;

  const senderId = req.user.id;

  const senderPhoto = await getSenderPhoto(senderId);

  const notification = await Notification.create({
    senderId,
    senderPhoto,
    receiverId,
    title,
    type,
    description,
    read,
    date,
  });

  if (notification) {
    const io = req.app.get("socketio");
    io.emit("newNotification");

    res.status(201).json({
      data: {
        notifications: [
          {
            id: notification._id,
            senderId: notification.senderId,
            receiverId: notification.receiverId,
            photo: notification.senderPhoto,
            title: notification.title,
            type: notification.type,
            description: notification.description,
            read: notification.read,
            date: notification.date,
          },
        ],
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid notification data");
  }
});

// @route PUT notifications/markAsRead
// @desc mark notification as read
// @access Private
exports.markNotificationAsRead = asyncHandler(async (req, res, next) => {
  const query = { _id: req.body.id };
  const notification = await Notification.findOneAndUpdate(query, { read: true }, { new: true });

  if (!notification) {
    res.status(404);
    throw new Error("No notification found");
  }

  res.status(200).json({
    data: {
      notifications: notification,
    },
  });
});

// @route GET /notifications/getAll
// @desc Get all user notifications
// @access Private
exports.getAllNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await Notification.find({ userId: req.user.id });

  if (!notifications) {
    res.status(404);
    throw new Error("No notifications yet");
  }

  res.status(200).json({
    data: {
      notifications: notifications,
    },
  });
});

// @route GET /notifications/getUnread
// @desc Get all unread user notifications
// @access Private
exports.getUnreadNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await Notification.find({ userId: req.user.id, read: false });

  if (!notifications) {
    res.status(400);
    throw new Error("No unread notifications");
  }

  res.status(200).json({
    data: {
      notifications: notifications,
    },
  });
});
