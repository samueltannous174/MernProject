const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

router.post('/postTopic', topicController.postTopic);
router.get('/getTopics', topicController.getTopics);
router.get('/getTopicById/:id', topicController.getTopicById);
router.get('/getTopics/user/:userId', topicController.getUserTopics);


module.exports = router;
