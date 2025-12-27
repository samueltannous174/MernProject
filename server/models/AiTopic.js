const mongoose = require("mongoose");

const AiTopicSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: { type: String, required: true },

  mainImage: { type: String },

  learningPath: [String],

  videos: [
    { title: String, url: String, embed: String }
  ],

  mistakes: [String],

  fullResponse: String,

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AiTopic", AiTopicSchema);
