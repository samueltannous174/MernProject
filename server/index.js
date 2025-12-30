const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const http = require("http"); 
const { Server } = require("socket.io");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

connectDB();

const router = require("./routes/route.js");
router(app);

const authRoutes = require("./routes/authRoutes");
app.use(authRoutes);

const aiRoutes = require("./routes/aiRoutes");
app.use(aiRoutes);

const topicRoutes = require("./routes/topicRoutes");
app.use(topicRoutes);

const eventsRoutes = require("./routes/eventsRoutes.js");
app.use(eventsRoutes);

app.use("/api/video-progress", require("./routes/videoProgressRoutes.js"));
app.use("/api/analytics", require("./routes/analyticsRoutes.js"));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.post("/notify", (req, res) => {
  const { userId, message } = req.body;
  io.to(userId).emit("notification", { message });
  res.json({ success: true });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
