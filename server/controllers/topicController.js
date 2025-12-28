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

exports.addUserToTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const topic = await Topic.findByIdAndUpdate(
      topicId,
      { $addToSet: { users: userId } },  // prevents duplicates
      { new: true }
    );

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.status(200).json(topic);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getTopicsForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const topics = await Topic.find({ users: userId })
      .sort({ createdAt: -1 })
      .populate("users", "name email"); // optional

    res.status(200).json(topics);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
