const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dontev").config();

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
      res.status(401).json({ message: "incorrect email or password" });
      return;
    }
    const userData = {
      id: user._id,
      email: user.email,
      role: "admin",
    };
    const token = jwt.sign(userData, process.env.JWT_KEY, {
      expiresIn: "48h", //token duration
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occured during the connexion attempt" });
  }
};
