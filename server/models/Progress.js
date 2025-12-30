const mongoose = require("mongoose");
 
const ProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    totalVideos: {
      type: Number,
      required: true,
    },
    completedVideos: {
      type: Number,
      default: 0,
    },
    timeSpentMinutes: {
      type: Number,
      default: 0,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model("Progress", ProgressSchema);