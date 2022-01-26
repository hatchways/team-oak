const PetSitter = require("../models/PetSitter")
const Schedule = require("../models/Schedule");
const asyncHandler = require("express-async-handler");
const Availability = require("../models/Availability");

// @route POST /availability/schedule/:scheduleId
// @desc create or update a schedule
// @access Private
exports.createSchedule = asyncHandler(async (req, res, next) => {
  const petsitter = await PetSitter.findOne(req.user);
  const availability = await Availability.findById(petsitter.availabilityId);
  const scheduleIds = await availability.scheduleIds
  const { name, MondayFrom, MondayTo, TuesdayFrom, TuesdayTo, WednesdayFrom, WednesdayTo, ThursdayFrom, ThursdayTo, FridayFrom, FridayTo, SaturdayFrom, SaturdayTo, SundayFrom, SundayTo } = req.body;
  
  const newPeriods = {
    monday: {
      startTime: MondayFrom,
      endTime: MondayTo,
    },
    tuesday: {
      startTime: TuesdayFrom,
      endTime: TuesdayTo,
    },
    wednesday: {
      startTime: WednesdayFrom,
      endTime: WednesdayTo,
    },
    thursday: {
      startTime: ThursdayFrom,
      endTime: ThursdayTo,
    },
    friday: {
      startTime: FridayFrom,
      endTime: FridayTo,
    },
    saturday: {
      startTime: SaturdayFrom,
      endTime: SaturdayTo,
    },
    sunday: {
      startTime: SundayTo,
      endTime: SundayFrom,
    },
  };

  if (scheduleIds.includes(req.params.scheduleId)) {
    schedule = await Schedule.findById(req.params.scheduleId)
    schedule.name = name;
    schedule.periods = newPeriods;
    schedule.save()

    res.status(201).json({
      success: {
        schedule
      }
    })
  } else {
      const newSchedule = await Schedule.create({
        name,
        periods: newPeriods
      });

      availability.scheduleIds.push(newSchedule._id)
      await availability.save()
  
      res.status(201).json({
        success: {
          newSchedule
        }
      })
  }
});

// @route GET /availability/schedule/active
// @desc get active schedule
// @access Private
exports.activeSchedule = asyncHandler(async (req, res, next) => {
  const petsitter = await PetSitter.findOne(req.user);
  const availability = await Availability.findById(petsitter.availabilityId);
  const activeScheduleId = await availability.activeScheduleId;
  const activeSchedule = await Schedule.findById(activeScheduleId)

  if (!activeSchedule) {
    res.status(401);
    throw new Error("active schedule not found");
  } 
  res.status(201).json({
    success: {
      activeSchedule
    }
  })
})

// @route GET /availability/schedule
// @desc get all schedules for current signed in petsitter
// @access Private
exports.getAllSchedules = asyncHandler(async (req, res, next) => {  
  const petsitter = await PetSitter.findOne(req.user);
  const availability = await Availability.findById(petsitter.availabilityId);
  const scheduleIds = await availability.scheduleIds;
  const output = []

  for (const id of scheduleIds) {
    const schedule = await Schedule.findById(id);
    output.push(schedule)
  };

  res.status(200).json({
    success: {
      output,
    }
  })
});

// @route POST /availability/schedule/:scheduleId/activate
// @desc set active schedule id for a petsitter
// @access Private
exports.activateSchedule = asyncHandler(async (req, res, next) => {
  const petsitter = await PetSitter.findOne(req.user);
  const availability = await Availability.findById(petsitter.availabilityId)
  const scheduleIds = await availability.scheduleIds
  const scheduleId = req.params.scheduleId;
  
  if (scheduleIds.includes(scheduleId)) {
    availability.activeScheduleId = scheduleId;
    await availability.save();

    res.status(200).json({
      success: {
        'active schedule updated': scheduleId
      }
    })
  } else {
    res.status(400);
    throw new Error("could not locate requested schedule id");
  } 
})


