const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  user_id: {
    type: String,
   required: true
  },
  trip_name: {
     type: String,
  
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category_name: {
    type: String,
    required: true,
  },
  expense_date: {
    type: String,
   
  },
  notes: {
    type: String,
    default: '',
  }
});

module.exports = mongoose.model('Expense', expenseSchema);
