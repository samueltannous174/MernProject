const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const port = 8000;

// --- Middleware ---
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// --- Connect to MongoDB ---
connectDB();

// --- Routes ---
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
const io = new Server(server, { cors: { origin: "*" } });

// server.js
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);

      io.to(userId).emit("notification", { 
      message: "Connection established! You will receive updates here." 
    });
  });
});

app.set("io", io);

app.post("/notify", (req, res) => {
  const { userId, message } = req.body;
  io.to(userId).emit("notification", { message });
  res.json({ success: true });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
