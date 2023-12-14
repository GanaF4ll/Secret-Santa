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
// url = http://localhost:3000/user/register

/**
 * @swagger
 * /user/register:
 *  post:
 *      summary: Allows a user to log in.
 *      requestBody:
 *          required: true
 *          content:
 *          application/json:
 *              example: secret@santa.com
 *              password: "secret"
 *      responses:
 *          200:
 *              description: Request successful.
 *              content:
 *                  application/json:
 *                      example:
 *                          message: 'json{token}'
 */
router.post("/user/login", userController.userLogin);
// url = http://localhost:3000/user/login

//test route
router.delete("/user/delete/:email", userController.userDelete);
// real route with token
// router.delete("/user/delete/:email", verifyToken, userController.userDelete);
// url = http://localhost:3000/user/delete/:email
