const Group = require("../models/groupModel");
const User = require("../models/userModel");
const Invitation = require("../models/invitationModel");
// Fonction pour mélanger de manière aléatoire un tableau
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Attribuates a user_email to another one for secret santa
async function assignSecretSantas(groupId) {
  // Gets the group from the database
  const group = await Group.findById(groupId).populate("confirmedUsers");

  if (!group) {
    console.error("Groupe non trouvé");
    return;
  }

  const confirmedUsers = group.confirmedUsers;

  // Verify if there is enough users in the group
  if (confirmedUsers.length < 2) {
    console.error("Le groupe doit avoir au moins deux membres");
    return;
  }

  // Randomly shuffles the user list
  shuffleArray(confirmedUsers);

  // Assigns each user to another one
  const assignments = confirmedUsers.map((user, index) => {
    const assignedTo = confirmedUsers[(index + 1) % confirmedUsers.length];
    return { user: user, assignedTo: assignedTo };
  });

  // Logs the assignmets
  assignments.forEach((assignment) => {
    console.log(
      `${assignment.user.email} est le Secret Santa de ${assignment.assignedTo.email}`
    );
  });
}

module.exports = {
  assignSecretSantas,
};
