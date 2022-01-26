const { check, validationResult } = require("express-validator");

exports.validateRegister = [
  check("name", "Please enter a name").not().isEmpty(),
  check("email", "Please enter a valid email address").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({
    min: 6
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];

exports.validateLogin = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];

exports.validateSchedule = [
  check("MondayFrom", "Please use hours from 0 to 24").isInt({min:0,max:24}),
  check("TuesdayFrom", "Please use hours from 0 to 24").isInt({min:0,max:24}),
  check("WednesdayFrom", "Please use hours from 0 to 24").isInt({min:0,max:24}),
  check("ThursdayFrom", "Please use hours from 0 to 24").isInt({min:0,max:24}),
  check("FridayFrom", "Please use hours from 0 to 24").isInt({min:0,max:24}),
  check("SaturdayFrom", "Please use hours from 0 to 24").isInt({min:0,max:24}),
  check("SundayFrom", "Please use hours from 0 to 24").isInt({min:0,max:24}),
  check("MondayTo", "Please use hours from 0 to 24").isInt({min:0,max:24}),
  check("TuesdayTo", "Please use hours from 0 to 24").isInt({min:0,max:24}),
  check("WednesdayTo", "Please use hours from 0 to 24").isInt({min:0,max:24}),
  check("ThursdayTo", "Please use hours from 0 to 24").isInt({min:0,max:24}),
  check("FridayTo", "Please use hours from 0 to 24").isInt({min:0,max:24}),
  check("SaturdayTo", "Please use hours from 0 to 24").isInt({min:0,max:24}),
  check("SundayTo", "Please use hours from 0 to 24").isInt({min:0,max:24}), 

  check("MondayTo", "Start time must be before end time").custom((value, {req}) => value - req.body.MondayFrom),
  check("TuesdayTo", "Start time must be before end time").custom((value, {req}) => value - req.body.TuesdayFrom),
  check("WednesdayTo", "Start time must be before end time").custom((value, {req}) => value - req.body.WednesdayFrom),
  check("ThursdayTo", "Start time must be before end time").custom((value, {req}) => value - req.body.ThursdayFrom),
  check("FridayTo", "Start time must be before end time").custom((value, {req}) => value - req.body.FridayFrom),
  check("SaturdayTo", "Start time must be before end time").custom((value, {req}) => value - req.body.SaturdayFrom),
  check("SundayTo", "Start time must be before end time").custom((value, {req}) => value - req.body.SundayFrom),

  check("name", "Schedule must have a name").not().isEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];
