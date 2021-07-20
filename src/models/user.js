const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    unique: true,
    max: 70,
  },
  role: {
    type: String,
    required: true,
    min: 4,
    max: 5,
  }
});

module.exports = mongoose.model("User", UserSchema);
