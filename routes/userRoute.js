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
 * /user/login:
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

/**
 * @swagger
 * /user/delete/{email}:
 *  delete:
 *      summary: Deletes a user.
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
 *                          message: 'User deleted : ${user.email}'
 */
//test route
// router.delete("/user/delete/:email", userController.userDelete);
// real route with token
router.delete("/user/delete/:email", verifyToken, userController.userDelete);
// url = http://localhost:3000/user/delete/:email

/**
 * @swagger
 * /user/update/{email}:
 *   put:
 *     summary: Allows the user to modify his email (token).
 *     headers:
 *       Authorization:
 *         description: JWT_KEY
 *     parameters:
 *       - in: path
 *         name: email
 *         description: User email updated.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: secret@santa.com
 *             password: "secret"
 *     responses:
 *       200:
 *         description: Request successful.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Email updated ${email}'
 */

// test route
router.put("/user/update/:email", userController.userUpdate);
// real route
// router.put("/user/update/:email", verifyToken, userController.userUpdate);
// url = http://localhost:3000/user/update/:email

module.exports = router;
