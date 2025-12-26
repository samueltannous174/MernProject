

// const mongoose = require('mongoose');

// const db = process.env.DB; 
// const username = process.env.ATLAS_USERNAME; 
// const password = process.env.ATLAS_PASSWORD; 

// // Include the database name in the URI
// const uri = `mongodb+srv://${username}:${password}@cluster0.zboyd4e.mongodb.net/?appName=Cluster0`;

// mongoose.connect(uri)
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch(err => console.error("Failed to connect to MongoDB", err));
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = process.env.DB; 
const username = process.env.ATLAS_USERNAME; 
const password = process.env.ATLAS_PASSWORD;

// Build MongoDB URI with the database name
const uri = `mongodb+srv://${username}:${password}@cluster0.zboyd4e.mongodb.net/${db}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // exit the process if connection fails
  }
};

connectDB(); // call the function immediately
