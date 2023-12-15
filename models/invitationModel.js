const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GroupModel = require("./groupModel");

let InvitationSchema = new Schema({
  group_id: { required: true, type: Schema.Types.ObjectId, ref: "Group" },
  group_name: { required: true, type: String, ref: "Group" },
  admin_id: { required: true, type: Schema.Types.ObjectId, ref: "Group" },
  invitedUsers: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  accepted: { type: Boolean, default: null }, // 0 = declined; 1 = accepted
  token: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Invitation = mongoose.model("InvitationSchema", InvitationSchema);
module.exports = Invitation;
