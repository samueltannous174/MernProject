// const Topic = require('../models/Topic');


// exports.postTopic = async (req, res) => {
//     try {
//         const newTopic = new Topic(req.body);
//         await newTopic.save();
//         res.status(201).json(newTopic);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// exports.getTopics = async (req, res) => {
//     try {
//         const topics = await Topic.find().sort({ createdAt: -1 });
//         res.json(topics);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// exports.getTopicById = async (req, res) => {
//     try {
//         const topic = await Topic.findById(req.params.id);
//         if (!topic) {
//             return res.status(404).json({ error: "Topic not found" });
//         }
//         res.json(topic);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }


    
    
// };

// exports.getUserTopics = async (req, res) => {
//     try {
//         const topics = await Topic.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//         res.json({ topics });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
const Topic = require('../models/Topic');

// Create a new topic
exports.postTopic = async (req, res) => {
  try {
    const { title, mainImage, content, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ error: "Title and userId are required" });
    }

    const newTopic = new Topic({
      title,
      mainImage: mainImage || "",
      content: content || {},
      userId, // attach the logged-in user
    });

    await newTopic.save();
    res.status(201).json(newTopic);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all topics
exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ createdAt: -1 });
    res.json({ topics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get topic by ID
exports.getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }
    res.json(topic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get topics for a specific user
exports.getUserTopics = async (req, res) => {
  try {
    const topics = await Topic.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ topics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
