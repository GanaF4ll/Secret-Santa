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
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const newGroup = new Group({
      admin_id,
      invitedUsers: req.body.invitedUsers,
      name: req.body.name,
    });

    const savedGroup = await newGroup.save();

    const adminTokenPayload = {
      id: admin_id,
      email: user.email,
      role: "admin",
      invitedUserId: admin_id,
      group_id: savedGroup._id,
      group_name: savedGroup.name, // Ajout de la propriété group_name
    };

    // Génère un token pour l'administrateur
    const adminToken = jwt.sign(adminTokenPayload, process.env.JWT_KEY, {
      expiresIn: "48h",
    });

    const adminInvitation = new Invitation({
      group_id: savedGroup._id,
      group_name: savedGroup.name,
      admin_id,
      invitedUsers: [admin_id],
      token: adminToken,
    });

    const savedAdminInvitation = await adminInvitation.save();

    // Crée des invitationSchema pour chaque invitedUserId
    const invitations = await Promise.all(
      req.body.invitedUsers.map(async (invitedUserId) => {
        const invitedUser = await User.findById(invitedUserId);

        if (!invitedUser) {
          // Si user_id n'existe pas
          return null;
        }

        const tokenPayload = {
          id: invitedUserId,
          group_id: savedGroup._id,
        };

        // Génère un token pour chaque invitedUser
        const token = jwt.sign(tokenPayload, process.env.JWT_KEY, {
          expiresIn: "48h",
        });

        const newInvitation = new Invitation({
          group_id,
          group_name: group.name, // Utilisez group.name plutôt que savedGroup.name
          admin_id: req.user.id,
          invitedUsers: [user_id],
          token,
        });

        return newInvitation.save();
      })
    );

    res.status(201).json({
      group: savedGroup,
      invitations: [savedAdminInvitation, ...invitations],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createInvitation = async (req, res) => {
  try {
    const { user_id } = req.body;
    const group_id = req.params.group_id;

    console.log("UserID from token:", req.user.id);
    console.log("Group ID from params:", group_id);

    const invitedUser = await User.findById(user_id);

    if (!invitedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Retrieve the group based on the group_id
    const group = await Group.findById(group_id);

    if (!group) {
      return res.status(404).json({ message: "Groupe non trouvé" });
    }

    // Verify if the ID in the token = Group.admin_id
    if (req.user.id !== group.admin_id.toString()) {
      console.log("Mismatch: User ID in token does not match Group admin_id");
      return res.status(403).json({
        message: "Non autorisé à créer des invitations pour ce groupe",
      });
    }

    const tokenPayload = {
      invitedUserId: user_id,
      group_id,
    };

    // Generates a token for the invited user
    const token = jwt.sign(tokenPayload, process.env.JWT_KEY, {
      expiresIn: "48h",
    });

    console.log("Group Name:", group.name);
    const newInvitation = new Invitation({
      group_id,
      group_name: group.name,
      admin_id: req.user.id, // Utilisez req.user.id comme admin_id
      invitedUsers: [user_id],
      token,
    });

    const savedInvitation = await newInvitation.save();

    res.status(201).json({ invitation: savedInvitation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
