
// const User = require('../models/User');

// exports.register = async (req, res) => {
//   try {
//     const { first_name, last_name, email, password } = req.body || {};
//     if (!first_name || !last_name || !email || !password)
//       return res.status(400).json({ error: 'All fields are required' });

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ error: 'Email already registered' });

//     const user = new User({ first_name, last_name, email, password_hash: password });
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully', user });
//   } catch (err) {
//     console.error('REGISTER ERROR:', err);
//     res.status(500).json({ error: 'Something went wrong!' });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body || {};
//     if (!email || !password)
//       return res.status(400).json({ error: 'Email and password required' });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ error: 'Invalid credentials' });

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

//     res.status(200).json({ message: 'Login successful', user });
//   } catch (err) {
//     console.error('LOGIN ERROR:', err);
//     res.status(500).json({ error: 'Something went wrong!' });
//   }
// };

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty" });
    }
    console.log("Request body:", req.body);

    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email,
      password_hash: hashedPassword, // Match your User model
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty" });
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash); // Use password_hash
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
