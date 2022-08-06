const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  user_id: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "None",
  },
});

const diaryDetails = mongoose.model("diary", diarySchema);

module.exports = diaryDetails;
