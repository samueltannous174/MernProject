

const mongoose = require('mongoose');

const db = process.env.DB; 
const username = process.env.ATLAS_USERNAME; 
const password = process.env.ATLAS_PASSWORD; 

// Include the database name in the URI
const uri = `mongodb+srv://${username}:${password}@cluster0.zboyd4e.mongodb.net/?appName=Cluster0`;

mongoose.connect(uri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("Failed to connect to MongoDB", err));
