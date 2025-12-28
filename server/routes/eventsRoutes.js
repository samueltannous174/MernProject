const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

router.get("/events/:userId", eventsController.getEvents);
router.post("/events", eventsController.postEvent);
router.put("/events", eventsController.putEvent);
router.delete("/events", eventsController.deleteEvent);

module.exports = router;
