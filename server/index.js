const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors")

const app = express();
const port = 8000;
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

connectDB();


const router = require("./routes/route.js");
router(app);

const authRoutes = require("./routes/authRoutes");
app.use( authRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


