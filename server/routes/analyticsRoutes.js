const router = require("express").Router();
const analytics = require("../controllers/analyticsController");
 
router.get("/videos-by-topic", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "userId is required" });
 
  const data = await analytics.videosByTopic(userId);
  res.json(data);
});
 
router.get("/topics", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "userId is required" });
 
  const data = await analytics.topicsProgress(userId);
  res.json(data);
});
 
module.exports = router;
 