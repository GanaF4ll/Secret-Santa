const Group = require("../models/groupModel");
const User = require("../models/userModel");
const Invitation = require("../models/invitationModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// // Controller pour accepter une invitation
// exports.acceptInvitation = async (req, res) => {
//   try {
//     const invitationId = req.params.invitationId;

//     // Récupérer l'invitation
//     const invitation = await Invitation.findById(invitationId);

//     if (!invitation) {
//       return res.status(404).json({ message: "Invitation non trouvée" });
//     }

//     // Mettre à jour l'invitation (supprimer l'invitation)
//     await Invitation.findByIdAndRemove(invitationId);

//     // Mettre à jour le groupe
//     const groupId = invitation.group_id;
//     const group = await Group.findById(groupId);

//     if (!group) {
//       return res.status(404).json({ message: "Groupe non trouvé" });
//     }

//     // Ajouter l'invité confirmé aux confirmedUsers
//     group.confirmedUsers.push(invitation.invitedUsers[0]);

//     // Sauvegarder les modifications apportées au groupe
//     await group.save();

//     res.status(200).json({ message: "Invitation acceptée avec succès" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// Controller pour accepter une invitation
exports.acceptInvitation = async (req, res) => {
  try {
    const invitationId = req.params.invitationId;

    // Récupérer l'invitation
    const invitation = await Invitation.findById(invitationId);

    if (!invitation) {
      return res.status(404).json({ message: "Invitation non trouvée" });
    }

    // Récupérer l'ID de l'utilisateur à partir du token
    const userIdInToken = req.user.id;
    console.log("ID reçu par le token:", userIdInToken);

    // Vérifier si l'ID dans le token correspond à l'ID dans l'invitation
    const invitedUserId = invitation.invitedUsers[0].toString(); // Convertir ObjectId en chaîne
    console.log("ID dans invitedUsers:", invitedUserId);

    if (userIdInToken !== invitedUserId) {
      return res
        .status(403)
        .json({ message: "Non autorisé à accepter cette invitation" });
    }

    // Puts accepted to true
    invitation.accepted = true;
    await invitation.save();

    // Update the group
    const groupId = invitation.group_id;
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Groupe non trouvé" });
    }

    group.confirmedUsers.push(invitation.invitedUsers[0]);

    await group.save();

    // Deletes the invitation
    await Invitation.findByIdAndRemove(invitationId);

    res.status(200).json({ message: "Invitation acceptée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
