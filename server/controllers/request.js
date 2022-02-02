const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");
const {
  updateRequest,
  checkBodyForEmptyFields,
} = require("../utils/helperFunctions");

// @route GET /requests
// @desc Get list of requests for logged-in user
// @access Private
exports.loadRequests = asyncHandler(async (req, res, next) => {
  const requests = await Request.find({
    userId: req.user.id,
  });

  res.status(200).json(requests);
});

// @route POST /requests
// @desc Create a new request
// @access Private
exports.newRequest = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { start, end } = req.body;
  const sitterId = req.params.id;

  const request = await Request.create({
    userId,
    sitterId,
    start,
    end,
  });

  if (request) {
    res.status(201).json({
      success: {
        request: {
          request,
        },
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route PATCH /requests/:requestId
// @desc Update request with approved or declined
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {
  const requestId = req.params.requestId;

  const fieldsToChange = checkBodyForEmptyFields(
    req,
    "accepted",
    "declined",
    "paid"
  );

  let request;
  if (requestId) {
    request = await Request.findOne({
      _id: requestId,
    });
  } else {
    throw new Error("requestID field required to find proper request");
  }

  request = updateRequest(request, fieldsToChange, req);
  await request.save();

  res.status(200).json(request);
});
