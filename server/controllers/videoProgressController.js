const VideoProgress = require("../models/VideoProgress");
const Progress = require("../models/Progress");
 
exports.updateVideoProgress = async (req, res) => {
  try {
    const { userId, topicId, videoId, watchedSeconds, durationSeconds, totalVideos } = req.body;
    console.log(req.body);
    const completed = watchedSeconds >= durationSeconds * 0.9;
 
    let video = await VideoProgress.findOne({ user: userId, topic: topicId, videoId });
 
    if (!video) {
      video = await VideoProgress.create({
        user: userId,
        topic: topicId,
        videoId,
        watchedSeconds,
        durationSeconds,
        completed,
      });
    } else {
      video.watchedSeconds = Math.max(video.watchedSeconds, watchedSeconds);
      video.completed = completed;
      video.lastWatchedAt = Date.now();
      await video.save();
    }
 
    // Sync topic progress
    const completedVideos = await VideoProgress.countDocuments({
      user: userId,
      topic: topicId,
      completed: true,
    });
 
    let progress = await Progress.findOne({ user: userId, topic: topicId });
 
    if (!progress) {
      await Progress.create({
        user: userId,
        topic: topicId,
        totalVideos,
        completedVideos,
        timeSpentMinutes: Math.floor(watchedSeconds / 60),
      });
    } else {
      progress.completedVideos = completedVideos;
      progress.timeSpentMinutes += Math.floor(watchedSeconds / 60);
      progress.lastActivity = Date.now();
      await progress.save();
    }
 
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update video progress" });
  }
};
 
// Resume learning
exports.resumeLastVideo = async (req, res) => {
  try {
    const { userId, topicId } = req.query;
    console.log(req.query);
 
    const last = await VideoProgress.findOne({
      user: userId,
      topic: topicId,
    }).sort({ lastWatchedAt: -1 });
 
    if (!last) return res.json(null);
 
    res.json({
      videoId: last.videoId,
      watchedSeconds: last.watchedSeconds,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to get last video" });
  }
};
 