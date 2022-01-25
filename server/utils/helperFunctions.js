const ObjectId = require("mongoose").Types.ObjectId;

/**
 * Check req.query for specified empty fields.
 * @param {Object} req - Express request object
 * @param {String} fieldsToCheck - Comma separated keys from req to check
 * @returns {Array} Array of fields that were checked
 */
module.exports.checkBodyForEmptyFields = function checkQueryForEmptyFields(
  req,
  ...fieldsToCheck
) {
  const fieldsToChange = [];

  for (const field of fieldsToCheck) {
    if (typeof req.body[field] !== "undefined") {
      fieldsToChange.push(field);
    }
  }

  return fieldsToChange;
};

/**
 * Update specified fields of Mongoose request object with values from req.params.
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
    if (isArrayBoolean(req.body[field])) {
      request[field] = updateRequestField(request, field, req.body[field]);
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

/** Compares string version of id against string version of new ObjectId
 * with id provided as a parameter. If original id isn't a valid ObjectId,
 * `String(new ObjectId(id))` will create a new object with a mismatched id.
 * @param {String} id - String (or anything that can be cast as String) containing
 * id to be checked
 * @returns {Boolean} Returns true if id is valid, false otherwise
 */
function isObjectIdValid(id) {
  if (ObjectId.isValid(id)) {
    return String(new ObjectId(id)) === String(id);
  } else {
    return false;
  }
}

/**
 * Checks for boolean values while accepting strings "true", "false", "1", or "0"
 * as their boolean equivalents.
 * @param {Array} values - Array to check for boolean values
 * @returns {Boolean} Returns true if values are all boolean, false otherwise
 */
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
