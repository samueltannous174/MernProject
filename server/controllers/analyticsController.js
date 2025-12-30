const Progress = require("../models/Progress");
 
// Videos by topic
exports.videosByTopic = async (userId) => {
  const data = await Progress.find({ user: userId })
    .populate("topic", "title");
  console.log(data);
 
  return data.map((p) => ({
    topic: p.topic.title,
    completed: p.completedVideos,
    total: p.totalVideos,
  }));
};
 
// Topics progress
exports.topicsProgress = async (userId) => {
  const data = await Progress.find({ user: userId });
  console.log(data);
 
  const completed = data.filter(
    (p) => p.completedVideos >= p.totalVideos
  ).length;
 
  return {
    completed,
    remaining: data.length - completed,
  };
};
 