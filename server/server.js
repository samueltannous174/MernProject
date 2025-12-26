
// // 
// import dotenv from "dotenv";
// dotenv.config();


// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');
// require('./config/db'); 

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET','POST','PUT','DELETE','OPTIONS'],
//   allowedHeaders: ['Content-Type','Authorization'],
//   credentials: true
// }));

// app.get('/', (req, res) => res.send('hello'));

// app.use('/api/auth', authRoutes);

// const port = process.env.PORT || 8000;
// app.listen(port, () => console.log(`Listening on port: ${port}`));
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js"; // Auth routes
import "./config/db.js"; // Connect to MongoDB

const app = express();

// Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(
  cors({
    origin: "http://localhost:5173", // your React frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Auth routes
app.use("/api/auth", authRoutes);

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
