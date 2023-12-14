const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();

exports.userRegister = async (req, res) => {
  try {
    const cryptPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: cryptPassword,
      role: req.body.role,
    });
    const user = await newUser.save();
    res.status(201).json({ message: `User created: ${user.email}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "User creation failed" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(401).json({ message: "Incorrect email or password" });
      return;
    }

    const userData = {
      id: user._id,
      email: user.email,
      role: user.role, // Assuming you have a 'role' property in your user schema
    };

    const token = jwt.sign(userData, process.env.JWT_KEY, {
      expiresIn: "48h", // Token duration
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred during the connection attempt" });
  }
};

exports.userDelete = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.body.email });
    if (user) {
      res.status(200).json({ message: `User deleted: ${user.email}` });
    } else {
      res.status(404).json({ message: "User does not exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occured while trying to delete the user",
    });
  }
};
