const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { 
  createNotification,
  markNotificationAsRead,
  getAllNotifications,
  getUnreadNotifications,
} = require('../controllers/notifications');

router.route('/create').post(protect, createNotification)

router.route('/markAsRead').put(protect, markNotificationAsRead);

router.route('/getAll').get(protect, getAllNotifications);

router.route('/getUnread').get(protect, getUnreadNotifications);

module.exports = router;