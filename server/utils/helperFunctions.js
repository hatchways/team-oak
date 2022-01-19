/*
 * Contents:
 * Public - validateQuery(query)
 * Private - isObjectIdValid(id)
 * Private - isArrayBoolean(values[])
 */

const ObjectId = require("mongoose").Types.ObjectId;

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
