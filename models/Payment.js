const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order_id: { type: String, required: true },
  payment_id: { type: String, required: true },
  signature: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['success', 'failed'], default: 'success' },
});

module.exports = mongoose.model('Payment', PaymentSchema);
