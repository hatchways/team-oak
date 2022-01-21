const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");
const {
  updateRequest,
  checkQueryForEmptyFields,
  validateQueryForNewRequest,
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
  const { validateQueryForNewRequest } = require("../utils/helperFunctions");

  let data;
  if (Object.keys(req.query).length > 0) {
    data = req.query;
  } else {
    data = req.body;
  }

  validateQueryForNewRequest(res, data);

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
