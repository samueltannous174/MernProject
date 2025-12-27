const User = require("../models/User");
const Topic = require("../models/Topic");

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get user courses/topics
exports.getUserCourses = async (req, res) => {
  try {
    const courses = await Topic.find({ userId: req.params.id }).sort({ createdAt: -1 });
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
