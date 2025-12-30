const express = require("express");
const router = express.Router();
const aiController = require("../controllers/AiController");


router.post("/chat", aiController.chat);
router.post("/createAiTopic", aiController.createAiTopic);

router.get("/userAiTopics/:userId", aiController.getUserTopics);
router.get("/aiTopic/:id", aiController.getAiTopicById);
router.delete("/aiTopic/:id", aiController.deleteAiTopic);

 
module.exports = router;
