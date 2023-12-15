const Group = require("../models/groupModel");
const User = require("../models/userModel");
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
      invitedUsers: [],
      ...req.body,
    });

    try {
      const savedGroup = await newGroup.save();

      res.status(201).json({ group: savedGroup });
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
