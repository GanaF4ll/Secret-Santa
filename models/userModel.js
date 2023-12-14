const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Boolean,
  },
  group_id: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
