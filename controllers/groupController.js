const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.createAGroup = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    const newGroup = new Group({
      user_id: req.params.user_id,
      ...req.body,
    });

    try {
      const savedGroup = await newGroup.save();
      res.status(201).json(savedGroup);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur (db)." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur serveur (utilisateur inexistant)." });
  }
};
