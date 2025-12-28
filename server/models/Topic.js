const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    title: { type: String, required: true },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],    mainImage: { type: String }, 
    content: Object,
}, {
    timestamps: true
});

module.exports = mongoose.model('Topic', TopicSchema);