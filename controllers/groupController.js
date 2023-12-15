const Group = require("../models/groupModel");
const User = require("../models/userModel");
const Invitation = require("../models/invitationModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createAGroup = async (req, res) => {
  try {
    const admin_id = req.user.id;
    const user = await User.findById(admin_id);

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    const newGroup = new Group({
      admin_id,
      invitedUsers: req.body.invitedUsers,
      name: req.body.name,
    });

    try {
      const savedGroup = await newGroup.save();
      // creates an InvitationSchema for each user_id in invitedUsers
      const invitations = await Promise.all(
        req.body.invitedUsers.map(async (invitedUserId) => {
          const invitedUser = await User.findById(invitedUserId);

          if (!invitedUser) {
            return null;
          }

          const newInvitation = new Invitation({
            group_id: savedGroup._id,
            group_name: savedGroup.name,
            admin_id,
            invitedUsers: [invitedUserId],
          });

          return newInvitation.save();
        })
      );

      res.status(201).json({ group: savedGroup, invitations });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur serveur (utilisateur inexistant)." });
  }
};
