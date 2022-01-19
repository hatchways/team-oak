const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");
const {
  updateRequest,
  checkQueryForEmptyFields,
} = require("../utils/helperFunctions");

// @route GET /request/load
// @desc Get list of requests for logged-in user
// @access Private
exports.loadRequests = asyncHandler(async (req, res, next) => {
  const uid = req.user.id;
  let requests;

  if (uid) {
    requests = await Request.find({
      userId: uid,
    });
  }

  res.status(200).json(requests);
});

// @route POST /request/new
// @desc Create a new request
// @access Public
exports.newRequest = asyncHandler(async (req, res, next) => {
  const { validateQuery } = require("../utils/helperFunctions");
  const query = req.query;

  validateQuery(res, query);

  const request = new Request({
    userId: query.userId,
    sitterId: query.sitterId,
    start: query.start,
    end: query.end,
    accepted: query.accepted,
    declined: query.declined,
    paid: query.paid,
    address: {
      houseNumber: query.address.houseNumber,
      street: query.address.street,
      district: query.address.district,
      city: query.address.city,
      county: query.address.county,
      postalCode: query.address.postalCode,
      country: query.address.country,
    },
  });

  if (!(await request.save())) {
    res.status(500).send("There was an error saving your request");
  }

  res.status(200).send("Successfully saved request!");
});

// @route PATCH /request/update
// @desc Update request with approved or declined
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {
  const requestId = req.query.requestId;

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

  if (!(await request.save())) {
    res.status(500).send("There was an error saving your updated request");
  }

  res.status(200).send("Successfully updated request!");
});
