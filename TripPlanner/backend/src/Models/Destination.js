const mongoose = require('mongoose');
const { Schema } = mongoose;

const destinationSchema = new Schema({
  status:Number,
  user_id:String,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image_url: {
    type: String,
    default: null,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Destination', destinationSchema);
