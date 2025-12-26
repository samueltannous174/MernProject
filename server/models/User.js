
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema(
//   {
//     first_name: { type: String, required: true },
//     last_name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password_hash: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model('User', UserSchema);
// module.exports = User;
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User; // ✅ ES module default export
