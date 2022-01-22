const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");
const {
  updateRequest,
  checkQueryForEmptyFields,
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
  if (
    Object.keys(req.body).length === 0 &&
    Object.keys(req.query).length !== 0
  ) {
    res.status(400).json({
      status: "POST to /routes failed",
      message: "Request cannot be made in query parameters",
    });
  }

  const data = req.body;

  const request = new Request({
    userId: data.userId,
    sitterId: data.sitterId,
    start: data.start,
    end: data.end,
    accepted: data.accepted,
    declined: data.declined,
    paid: data.paid,
    address: {
      houseNumber: data.address.houseNumber,
      street: data.address.street,
      district: data.address.district,
      city: data.address.city,
      county: data.address.county,
      postalCode: data.address.postalCode,
      country: data.address.country,
    },
  });

  await request.save();

  res.status(200).json(request);
});

// @route PATCH /requests/:requestId
// @desc Update request with approved or declined
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {
  const requestId = req.params.requestId;

  const fieldsToChange = checkQueryForEmptyFields(
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
