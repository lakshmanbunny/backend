const razorpay = require('../config/payment');
const Payment = require('../models/Payment');

exports.createOrder = async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const order = await razorpay.orders.create({ amount, currency });
    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  try {
    const payment = new Payment({
      user: req.user.id,
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      signature: razorpay_signature,
    });
    await payment.save();
    res.json({ msg: 'Payment verified' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
