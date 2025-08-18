const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  status: String,
  user_id: String,

  trip_name: String,

  start_date: String,

  end_date: String,

  destination: String,

  budget: Number,

  category_id: String,

  accommodation: Number,
  food: Number,
  transport: Number,
   preferred_currency: {
    type: String,
    default: 'PKR'
  }
});

module.exports = mongoose.model("Trip", tripSchema);
