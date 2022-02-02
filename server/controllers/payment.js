const asyncHandler = require("express-async-handler");
const Payment = require("../models/Payment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// @route GET /payments
// @desc Get all payment from user
// @access Private
exports.getAllPayments = asyncHandler(async (req, res, next) => {
  const payment = await Payment.find({ userId: req.user.id });

  res.status(200).json({
    success: {
      payment: payment,
    },
  });

  res.status(404);
  throw new Error("Payments Not Found");
});

// @route GET /payments/:id
// @desc Get certain payment from id
// @access Private
exports.getPayment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const payment = await Payment.findById(id);
  if (payment) {
    res.status(200).json({
      success: {
        payment: payment,
      },
    });
  } else {
    res.status(404);
    throw new Error("Pls enter valid payment id");
  }
});

// @route PUT /payments/:id/pay
// @desc Pay current unpaid payment
// @access Private
exports.makePayment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const payment = await Payment.findOne({ id });

  if (!payment) {
    res.status(404);
    throw new Error("Payment doesn't exist");
  }

  if (payment.isPaid) {
    res.status(400);
    throw new Error("This payment has already be made");
  }

  const paymentConfirmation = await stripe.paymentIntents.confirm(payment.paymentIntentId, {
    payment_method: "pm_card_visa",
  });

  if (!paymentConfirmation) {
    res.status(500);
    throw new Error("Something went wrong");
  }

  payment.set({ isPaid: true });
  const updatedPayment = await payment.save();
  if (updatedPayment) {
    res.status(200).json({
      success: {
        msg: "Payment Complete",
        payment: updatedPayment,
        paymentConfirmation: paymentConfirmation,
      },
    });
  }
});

// @route PUT /payments/:id/cancel
// @desc Cancel current payment
// @access Private
exports.cancelPayment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const payment = await Payment.findOne({ _id: id });

  const paymentIntent = await stripe.paymentIntents.cancel(payment.paymentIntentId);

  if (!paymentIntent) {
    res.status(500);
    throw new Error("Something went wrong");
  }

  payment.set({ isCancelled: true });
  const updatedPayment = await payment.save();
  if (updatedPayment) {
    res.status(200).json({
      success: {
        msg: "Payment cancelled",
        payment: updatedPayment,
        paymentIntent: paymentIntent,
      },
    });
  }
});

// @route POST /payments/newPayment
// @desc Creates a new payment intent
// @access Private
exports.createPaymentIntent = asyncHandler(async (req, res, next) => {
  const { amount, currency, sitterId, rate, hoursOfService } = req.body;
  const userId = req.user.id;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    payment_method_types: ["card"],
  });

  if (!paymentIntent) {
    res.status(500);
    throw new Error("Something went wrong");
  }

  const payment = await Payment.create({
    sitterId,
    userId,
    rate,
    paymentIntentId: paymentIntent.id,
    hoursOfService,
  });

  if (payment) {
    res.status(201).json({
      data: {
        payment,
        paymentIntent,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid payment data");
  }
});
