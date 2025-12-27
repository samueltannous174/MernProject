
const Event = require("../models/Events");

exports.getEvents = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("getEvents called for user:", userId);

    const events = await Event.find({ userId }).sort({ start: 1 }).lean();

    console.log("events found:", events?.length);

    if (!events || events.length === 0) {
      return res.json([]);
    }

    const merged = [];
    let current = { ...events[0] };

    for (let i = 1; i < events.length; i++) {
      const next = events[i];

      const currentEnd = new Date(current.end).getTime();
      const nextStart = new Date(next.start).getTime();

      if (next.title === current.title && currentEnd === nextStart) {
        current.end = next.end;
      } else {
        merged.push(current);
        current = { ...next };
      }
    }

    merged.push(current);

    return res.json(merged);

  } catch (err) {
    console.error("❌ ERROR in getEvents:", err);
    return res.status(500).json({ message: "Server error in getEvents" });
  }
};


exports.postEvent = async (req, res) => {
  const { userId, title, start, end, color } = req.body;

  const event = await Event.create({
    userId,
    title,
    start,
    end,
    color
  });

  res.json(event);
};

exports.putEvent = async (req, res) => {
  const { userId, blockStart, blockEnd, title, color } = req.body;

  const result = await Event.updateMany(
    {
      userId,
      start: { $gte: blockStart },
      end:   { $lte: blockEnd },
    },
    { $set: { title, color } }
  );

  res.json({ updated: result.modifiedCount });
};

exports.deleteEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  const result = await Event.deleteOne({
    userId,
    _id: eventId
  });

  res.json({ deleted: result.deletedCount });
};




