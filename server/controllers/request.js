const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");

// @route GET /request/load
// @desc Get list of requests for logged-in user
// @access Private
exports.loadRequests = asyncHandler(async (req, res, next) => {
  // TODO
});

// @route POST /request/new
// @desc Create a new request
// @access Public
exports.newRequest = asyncHandler(async (req, res, next) => {
  // TODO
});

// @route UPDATE /request/update
// @desc Update request with approved or declined
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {
  // TODO
});
