const mongoose = require("mongoose");
const { Schema } = mongoose;

const faqSchema = new Schema({
  subject: String,
  user_id:String,
 faqQuestion: { type: String, required: true },
  faqAnswer: { type: String, required: true },
 submitted_at: {
    type: Date,
   
  },
});

module.exports = mongoose.model("faq", faqSchema);
