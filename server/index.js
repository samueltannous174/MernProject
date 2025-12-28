const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors")

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


