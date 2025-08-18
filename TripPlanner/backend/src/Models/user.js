const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password_hash: String,
  first_name: String,
  last_name: String,
  profile_picture: String,
  status: Number,
  is_admin: Number,
});

module.exports = mongoose.model("Users", userSchema);
