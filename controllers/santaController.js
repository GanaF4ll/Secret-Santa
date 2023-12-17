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

// Fonction pour attribuer secrètement des "Secret Santas"
async function assignSecretSantas(groupId) {
  // Récupérer le groupe de la base de données
  const group = await Group.findById(groupId).populate("confirmedUsers");

  if (!group) {
    console.error("Groupe non trouvé");
    return;
  }

  const confirmedUsers = group.confirmedUsers;

  // Vérifier s'il y a suffisamment de membres dans le groupe
  if (confirmedUsers.length < 2) {
    console.error("Le groupe doit avoir au moins deux membres");
    return;
  }

  // Mélanger la liste des utilisateurs de manière aléatoire
  shuffleArray(confirmedUsers);

  // Assigner secrètement chaque membre à un autre participant
  const assignments = confirmedUsers.map((user, index) => {
    const assignedTo = confirmedUsers[(index + 1) % confirmedUsers.length];
    return { user: user, assignedTo: assignedTo };
  });

  // Afficher les attributions (à des fins de vérification)
  assignments.forEach((assignment) => {
    console.log(
      `${assignment.user.email} est le Secret Santa de ${assignment.assignedTo.email}`
    );
  });
}

// Exemple d'utilisation
const groupId = "657ebd948859c48c263ada61";
assignSecretSantas(groupId);
