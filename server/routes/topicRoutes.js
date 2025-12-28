const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

router.post('/postTopic', topicController.postTopic);
router.get('/getTopics', topicController.getTopics);
router.get('/getTopicById/:id', topicController.getTopicById);
router.get('/getTopicsForUser/:userId', topicController.getTopicsForUser);
router.post('/addUserToTopic/:topicId', topicController.addUserToTopic);


module.exports = router;
