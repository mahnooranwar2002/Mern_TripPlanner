const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  user_id: {
    type:String
  },
  category_name: {
    type: String,
    required: true,
  },
  status:Number,
});

module.exports = mongoose.model('Category', categorySchema);
