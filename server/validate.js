const { check, validationResult } = require("express-validator");

exports.validateRegister = [
  check("name", "Please enter a name").not().isEmpty(),
  check("email", "Please enter a valid email address").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({
    min: 6,
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateLogin = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateRequest = [
  check("userId", "Invalid userId").isMongoId(),
  check("sitterId", "Invalid sitterId").isMongoId(),
  check("userId", "userId and sitterId cannot be the same")
    .not()
    .equals("sitterId"),
  check(
    "start",
    "Invalid start date, please use YYYY-MM-DDTHH:MM:SSZ"
  ).isISO8601(),
  check("end", "Invalid end date, please use YYYY-MM-DDTHH:MM:SSZ").isISO8601(),
  check("start").custom((start, meta) => {
    const end = meta.req.body.end;

    if (start > end) {
      throw new Error("Start date cannot be after end date");
    }

    return true;
  }),
  check("accepted", "Value accepted must be boolean").isBoolean(),
  check("declined", "Value declined must be boolean").isBoolean(),
  check("paid", "Value paid must be boolean").isBoolean(),
  check("address.houseNumber").toInt(),
  check("address.street", "Field street must be a string").isString(),
  check("address.city", "Field city must be a string").isString(),
  check("address.postalCode", "Invalid Canadian postal code").isPostalCode(
    "CA"
  ),
  check("address.country", "Field country must be a string").isString(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
