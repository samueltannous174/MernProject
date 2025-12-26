const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    mainImage: { type: String }, 
    content: Object,
}, {
    timestamps: true
});

module.exports = mongoose.model('Topic', TopicSchema);