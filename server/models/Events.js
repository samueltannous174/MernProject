const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: String,
  topicId   : { type: mongoose.Schema.Types.ObjectId, required: false },
  start: Date,
  end: Date,
  color: String
});

module.exports = mongoose.model("Event", eventSchema);
