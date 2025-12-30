const router = require("express").Router();
const controller = require("../controllers/videoProgressController");
 
// Update video progress
router.post("/update", controller.updateVideoProgress);
 
// Resume last video
router.get("/resume", controller.resumeLastVideo);
 
module.exports = router;
