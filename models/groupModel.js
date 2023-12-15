const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserModel = require("./userModel");

let groupSchema = new Schema({
  admin_id: { required: true, type: Schema.Types.ObjectId, ref: "User" },
  invitedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
