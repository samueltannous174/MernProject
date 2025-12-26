const Topic = require('../models/Topic');


exports.postTopic = async (req, res) => {
    try {
        const newTopic = new Topic(req.body);
        await newTopic.save();
        res.status(201).json(newTopic);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTopics = async (req, res) => {
    try {
        const topics = await Topic.find().sort({ createdAt: -1 });
        res.json(topics);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTopicById = async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id);
        if (!topic) {
            return res.status(404).json({ error: "Topic not found" });
        }
        res.json(topic);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
