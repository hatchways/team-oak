const Notification = require("../models/Notifications");
const asyncHandler = require("express-async-handler");

// @route POST /notification/create
// @desc create new notification
// @access Private
exports.createNotification = asyncHandler(async (req, res, next) => {
  const { title, type, description, read, date } = req.body;

  const userId = req.user.id;

  const notification = await Notification.create({
    userId,
    title,
    type,
    description,
    read,
    date,
  });

  if (notification) {
    res.status(201).json({
      success: {
        notification: {
          id: notification.userId,
          title: notification.title,
          type: notification.type,
          description: notification.description,
          read: notification.read,
          date: notification.date,
        },
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
    success: {
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
    success: {
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
    success: {
      notifications: notifications,
    },
  });
});
