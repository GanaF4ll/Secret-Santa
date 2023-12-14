const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (token !== undefined) {
      const payload = await new Promise((resolve, reject) => {
        jwt.verify(token, jwtKey, (error, decoded) => {
          if (error) {
            reject(error);
          } else {
            resolve(decoded);
          }
        });
      });

      req.user = payload;
      next();
    } else {
      res.status(403).json({ message: "Unauthorized access: missing token" });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Unauthorized access: unvalid token" });
  }
};
