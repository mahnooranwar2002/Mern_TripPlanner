const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactUsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    default: null
  },
  message: {
    type: String,
    required: true,
  },
  submitted_at: {
    type: String,
    default: Date.now
  }
});

module.exports = mongoose.model('ContactUs', contactUsSchema);
