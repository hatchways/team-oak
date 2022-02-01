const User = require("../models/User");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const dotenv = require('dotenv').config({path:__dirname+'/./../.env'})
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @route GET /connect/stripe
// @desc create new petsitter account
// @access Private
exports.createUser = asyncHandler(async (req, res, next) => { 
  const user = await User.findById(req.user.id);
  const profile = await Profile.findOne(req.user);

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

    profile.stripeAccountId = account.id;
    await profile.save()

    const accountLink = await stripe.accountLinks.create({
      account: profile.stripeAccountId,
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

// @route GET /connect/newCustomer
// @desc create new stripe customer account
// @access Private
  exports.createCustomer = asyncHandler(async (req, res, next) => { 
    const user = await User.findById(req.user.id);
    const profile = await Profile.findOne(req.user);
  
    const account = await stripe.customers.create({
      email: user.email,
      name: profile.name,
    });

    profile.stripeAccountId = account.id;
    await profile.save()

    res.status(201).json({
      success: 'new customer created'
    })
  })