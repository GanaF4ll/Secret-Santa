const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("userModel");

let groupSchema = new Schema({
  user: {
    id: { required, type: Schema.Types.ObjectId, ref: "User" },
    email: { required, type: String, ref: "User" },
  },
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
