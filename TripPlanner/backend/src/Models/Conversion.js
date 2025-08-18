const mongoose = require('mongoose');

const conversionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  fromCurrency: { type: String, required: true },
  toCurrency: { type: String, required: true },
  amount: { type: Number, required: true },
  convertedAmount: { type: Number, required: true },
  rate: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Conversion", conversionSchema);
