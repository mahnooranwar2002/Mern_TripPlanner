const mongoose = require('mongoose');
const { Schema } = mongoose;

const favDestinationSchema = new Schema({

  user_id:String,
  name:  String,

 

});

module.exports = mongoose.model('favDestination', favDestinationSchema);