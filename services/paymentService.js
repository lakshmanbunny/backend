const razorpay = require('../config/payment');
const Payment = require('../models/Payment');

exports.createOrder = async (orderData) => {
  const { amount, currency } = orderData;
  return await razorpay.orders.create({ amount, currency });
};

exports.verifyPayment = async (paymentData) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user } = paymentData;
  const payment = new Payment({
    user,
    order_id: razorpay_order_id,
    payment_id: razorpay_payment_id,
    signature: razorpay_signature,
  });
  await payment.save();
  return payment;
};
