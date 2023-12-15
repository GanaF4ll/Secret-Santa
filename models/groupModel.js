const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserModel = require("./userModel");

let groupSchema = new Schema({
  admin_id: { required: true, type: Schema.Types.ObjectId, ref: "User" },
  invitedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
