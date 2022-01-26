const User = require("../models/User");
const Profile = require("../models/Profile");
const PetSitter = require("../models/PetSitter");
const Availability = require("../models/Availability");
const Schedule = require("../models/Schedule");
const asyncHandler = require("express-async-handler");
const dotenv = require('dotenv').config({path:__dirname+'/./../.env'})
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createUser = asyncHandler(async (req, res, next) => { 
  const user = await User.findById(req.user.id);
  const profile = await Profile.findOne(req.user);

  const schedule = await Schedule.create({
    name: 'default schedule',
    periods: {
      monday: {
        startTime: '10',
        endTime: '22',
      },
      tuesday: {
        startTime: '10',
        endTime: '22',
      },
      wednesday: {
        startTime: '10',
        endTime: '22',
      },
      thursday: {
        startTime: '10',
        endTime: '22',
      },
      friday: {
        startTime: '10',
        endTime: '22',
      },
      saturday: {
        startTime: '10',
        endTime: '22',
      },
      sunday: {
        startTime: '10',
        endTime: '22',
      },
    }
  });

  const availability = await Availability.create({
    scheduleIds: [schedule._id],
    activeScheduleId: schedule._id,
  });

  const petsitter = await PetSitter.hydrate(profile.toObject());
  petsitter.kind = 'PetSitter';
  petsitter.availabilityId = availability._id;
  await petsitter.save()

  const account = await stripe.accounts.create({
    email: user.email,
    business_type: "company",
    company: {
      name: profile.name,
    },
    country: 'CA',
    default_currency: 'cad',
    type: 'standard', 
    });

    petsitter.stripeAccountId = account.id;
    await petsitter.save()

    const accountLink = await stripe.accountLinks.create({
      account: petsitter.stripeAccountId,
      refresh_url: process.env.STRIPE_CONNECT_REFRESH_URL,
      return_url: process.env.STRIPE_CONNECT_RETURN_URL,
      type: 'account_onboarding',
    });
    
    res.status(201).json({
      success: {
        accountLink
      }
    })
  });