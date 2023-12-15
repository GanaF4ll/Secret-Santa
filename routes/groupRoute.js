const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/jwtMiddleware");

router.post("/group/create/:user_id", groupController.createAGroup);
