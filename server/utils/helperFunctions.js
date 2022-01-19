/*
 * Contents
 * Public:
 *  - checkQueryForEmptyFields()
 *  - updateRequest()
 *  - validateQuery()
 * Private:
 *  - updateRequestField()
 *  - isObjectIdValid()
 *  - isArrayBoolean()
 */

const ObjectId = require("mongoose").Types.ObjectId;

/**
 * Check req.query for specified empty fields
 * @param {Object} req - Express request object
 * @param {String} fieldsToCheck - Comma separated keys from req to check
 * @returns {Array} Array of fields that were checked
 */
module.exports.checkQueryForEmptyFields = function checkQueryForEmptyFields(
  req,
  ...fieldsToCheck
) {
  const fieldsToChange = [];

  for (const field of fieldsToCheck) {
    if (typeof req.query[field] !== "undefined") {
      fieldsToChange.push(field);
    }
  }

  return fieldsToChange;
};

/**
 * Update specified fields of Mongoose request object with values from req.query
 * @param {Object} request - Mongoose request object
 * @param {Array<String>} fieldsToChange - Array of fields to update
 * @param {Object} req - Express request object
 * @returns {Object} Updated Mongoose request object
 */
module.exports.updateRequest = function updateRequest(
  request,
  fieldsToChange,
  req
) {
  for (const field of fieldsToChange) {
    if (isArrayBoolean(req.query[field])) {
      request.field = updateRequestField(request, field, req.query[field]);
    } else {
      throw new Error(`Field '${field}' is not boolean`);
    }
  }

  return request;

  function updateRequestField(requestObject, resource, newValue) {
    if (
      typeof newValue !== "undefined" &&
      newValue !== requestObject.resource
    ) {
      return (requestObject[resource] = newValue);
    }

    return requestObject;
  }
};

// Compares string version of id against string version of new ObjectId
// with id provided as a parameter. If original id isn't a valid ObjectId,
// String(new ObjectId(id)) will create a new object with a mismatched id.
function isObjectIdValid(id) {
  if (ObjectId.isValid(id)) {
    return String(new ObjectId(id)) === String(id);
  } else {
    return false;
  }
}

module.exports.validateQuery = function validateQuery(res, query) {
  if (!isObjectIdValid(query.userId)) {
    res.status(400);
    throw new Error("Invalid userId");
  }

  if (!isObjectIdValid(query.sitterId)) {
    res.status(400);
    throw new Error("Invalid sitterId");
  }

  if (query.userId === query.sitterId) {
    res.status(400);
    throw new Error("userId and sitterId cannot be identical");
  }

  if (new Date(query.start) > new Date(query.end)) {
    res.status(400);
    throw new Error("Start date cannot be after end date");
  }

  if (new Date(query.start) < new Date(Date.now())) {
    res.status(400);
    throw new Error("Start date cannot be in the past");
  }

  if (!isArrayBoolean(query.accepted, query.declined, query.paid)) {
    res.status(400);
    throw new Error(
      "Required parameters 'accepted', 'declined', and 'paid' must be boolean values"
    );
  }
};

function isArrayBoolean(...values) {
  for (let value of values) {
    if (value === "true" || value === "1") {
      value = true;
    } else if (value === "false" || value === "0") {
      value = false;
    }

    if (typeof value !== "boolean") {
      return false;
    }
  }

  return true;
}
