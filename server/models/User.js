// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   role: {
//     type: String,
//     default: "visitor",
//   },
// });

// const UserModel = mongoose.model("users", UserSchema);
// module.exports = UserModel;

// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessLevel: { type: String, enum: ['HOD', 'Faculty'], required: true },
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
  }
  next();
});

// Method to check the password on login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

