const mongoose = require("mongoose");
 
const VideoProgressSchema = new mongoose.Schema(
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
    videoId: {
      type: String,
      required: true,
    },
    watchedSeconds: {
      type: Number,
      default: 0,
    },
    durationSeconds: {
      type: Number,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    lastWatchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model("VideoProgress", VideoProgressSchema);