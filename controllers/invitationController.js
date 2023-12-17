const Group = require("../models/groupModel");
const User = require("../models/userModel");
const Invitation = require("../models/invitationModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.acceptInvitation = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const decodedToken = jwt.decode(token);

    const invitation = await Invitation.findOne({
      token: token,
      accepted: null, // Only process if the invitation is not already accepted or declined
    });

    if (!invitation) {
      return res
        .status(404)
        .json({ message: "Invitation not found or already processed" });
    }

    // Check if the decoded ID is in the invitedUsers array
    if (invitation.invitedUsers.includes(decodedToken.id)) {
      // Update the invitation
      invitation.accepted = true;
      await invitation.save();

      // Update the group
      const group = await Group.findById(invitation.group_id);
      group.confirmedUsers.push(decodedToken.id);
      group.invitedUsers = group.invitedUsers.filter(
        (userId) => userId.toString() !== decodedToken.id.toString()
      );
      await group.save();

      res.status(200).json({ message: "Invitation accepted successfully" });
    } else {
      res.status(403).json({
        message: "Unauthorized access: invalid user for this invitation",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.declineInvitation = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const decodedToken = jwt.decode(token);

    const invitation = await Invitation.findOne({
      token: token,
      accepted: null, // Only process if the invitation is not already accepted or declined
    });

    if (!invitation) {
      return res
        .status(404)
        .json({ message: "Invitation not found or already processed" });
    }

    // Check if the decoded ID is in the invitedUsers array
    if (invitation.invitedUsers.includes(decodedToken.id)) {
      // Update the invitation as declined
      invitation.accepted = false;

      // Remove the invitation from the group
      const group = await Group.findById(invitation.group_id);
      group.invitedUsers = group.invitedUsers.filter(
        (userId) => userId.toString() !== decodedToken.id.toString()
      );
      await group.save();

      // Save the updated invitation
      await invitation.save();

      res.status(200).json({ message: "Invitation declined" });
    } else {
      res.status(403).json({
        message: "Unauthorized access: invalid user for this invitation",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
