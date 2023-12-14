const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/jwtMiddleware");

/**
 * @swagger
 * /user/register:
 *  post:
 *      summary: Register a new user.
 *      requestBody:
 *          required: true
 *          content:
 *          application/json:
 *              example: secret@santa.com
 *              password: "secret"
 *              role: 0
 *      responses:
 *          201:
 *              description: Request successful.
 *              content:
 *                  application/json:
 *                      example:
 *                          message: 'User created: ${user.mail}'
 */
router.post("/user/register", userController.userRegister);
