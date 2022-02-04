const PetSitter = require("../models/PetSitter");
const Schedule = require("../models/Schedule");
const asyncHandler = require("express-async-handler");
const Availability = require("../models/Availability");

// @route POST /availability/schedule/new
// @desc create a schedule
// @access Private
exports.createSchedule = asyncHandler(async (req, res, next) => {
  const petsitter = await PetSitter.findOne(req.user);
  const availability = await Availability.findById(petsitter.availabilityId);
  const {
    name,
    mondayFrom,
    mondayTo,
    tuesdayFrom,
    tuesdayTo,
    wednesdayFrom,
    wednesdayTo,
    thursdayFrom,
    thursdayTo,
    fridayFrom,
    fridayTo,
    saturdayFrom,
    saturdayTo,
    sundayFrom,
    sundayTo,
  } = req.body;

  const Periods = {
    monday: {
      startTime: mondayFrom,
      endTime: mondayTo,
    },
    tuesday: {
      startTime: tuesdayFrom,
      endTime: tuesdayTo,
    },
    wednesday: {
      startTime: wednesdayFrom,
      endTime: wednesdayTo,
    },
    thursday: {
      startTime: thursdayFrom,
      endTime: thursdayTo,
    },
    friday: {
      startTime: fridayFrom,
      endTime: fridayTo,
    },
    saturday: {
      startTime: saturdayFrom,
      endTime: saturdayTo,
    },
    sunday: {
      startTime: sundayTo,
      endTime: sundayFrom,
    },
  };

  const newSchedule = await Schedule.create({
    name,
    periods: Periods,
  });

  availability.scheduleIds.push(newSchedule._id);
  await availability.save();

  res.status(201).json({
    success: {
      newSchedule,
    },
  });
});

// @route PUT /availability/schedule/:scheduleId
// @desc update a schedule
// @access Private
exports.updateSchedule = asyncHandler(async (req, res, next) => {
  const petsitter = await PetSitter.findOne(req.user);
  const availability = await Availability.findById(petsitter.availabilityId);
  const {
    name,
    mondayFrom,
    mondayTo,
    tuesdayFrom,
    tuesdayTo,
    wednesdayFrom,
    wednesdayTo,
    thursdayFrom,
    thursdayTo,
    fridayFrom,
    fridayTo,
    saturdayFrom,
    saturdayTo,
    sundayFrom,
    sundayTo,
  } = req.body;

  const newPeriods = {
    monday: {
      startTime: mondayFrom,
      endTime: mondayTo,
    },
    tuesday: {
      startTime: tuesdayFrom,
      endTime: tuesdayTo,
    },
    wednesday: {
      startTime: wednesdayFrom,
      endTime: wednesdayTo,
    },
    thursday: {
      startTime: thursdayFrom,
      endTime: thursdayTo,
    },
    friday: {
      startTime: fridayFrom,
      endTime: fridayTo,
    },
    saturday: {
      startTime: saturdayFrom,
      endTime: saturdayTo,
    },
    sunday: {
      startTime: sundayTo,
      endTime: sundayFrom,
    },
  };

  if (availability.scheduleIds.includes(req.params.scheduleId)) {
    schedule = await Schedule.findById(req.params.scheduleId);
    schedule.name = name;
    schedule.periods = newPeriods;
    await schedule.save();

    res.status(201).json({
      success: {
        schedule,
      },
    });
  } else {
    res.status(401);
    throw new Error("cannot find the schedule you are trying to update");
  }
});

// @route GET /availability/schedule/active
// @desc get active schedule
// @access Private
exports.activeSchedule = asyncHandler(async (req, res, next) => {
  const petsitter = await PetSitter.findOne(req.user);
  const schedule = await petsitter.populate({
    path: "availabilityId",
    populate: {
      path: "activeScheduleId",
    },
  });

  const output = schedule.availabilityId.activeScheduleId;

  if (!output) {
    res.status(401);
    throw new Error("active schedule not found");
  }
  res.status(201).json({
    success: {
      output,
    },
  });
});

// @route GET /availability/schedule
// @desc get all schedules for current signed in petsitter
// @access Private
exports.getAllSchedules = asyncHandler(async (req, res, next) => {
  const petsitter = await PetSitter.findOne(req.user);
  const schedules = await petsitter.populate({
    path: "availabilityId",
    populate: {
      path: "scheduleIds",
    },
  });

  output = schedules.availabilityId.scheduleIds;

  res.status(200).json({
    success: {
      output,
    },
  });
});

// @route PUT /availability/schedule/:scheduleId/activate
// @desc set active schedule id for a petsitter
// @access Private
exports.activateSchedule = asyncHandler(async (req, res, next) => {
  const petsitter = await PetSitter.findOne(req.user);
  const availability = await Availability.findById(petsitter.availabilityId);
  const scheduleId = req.params.scheduleId;

  if (availability.scheduleIds.includes(scheduleId)) {
    availability.activeScheduleId = scheduleId;
    await availability.save();

    res.status(200).json({
      success: {
        "active schedule updated": scheduleId,
      },
    });
  } else {
    res.status(400);
    throw new Error("could not locate requested schedule id");
  }
});
