const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/jwtMiddleware");

/**
 * @swagger
 * tags:
 *   - name: user
 *     description: Operations related to users
 * /user/register:
 *   post:
 *     summary: Register a new user.
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             mail: secret@santa.com
 *             password: "secret"
 *             role: 0
 *     responses:
 *       201:
 *         description: Request successful.
 *         content:
 *           application/json:
 *             example:
 *               message: 'User created: ${user.mail}'
 */

router.post("/user/register", userController.userRegister);
// url = http://localhost:3000/user/register

/**
 * @swagger
 * tags:
 *   - name: user
 *     description: Operations related to users
 * /user/login:
 *   post:
 *     summary: Allows a user to log in.
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             mail: secret@santa.com
 *             password: "secret"
 *     responses:
 *       200:
 *         description: Request successful.
 *         content:
 *           application/json:
 *             example:
 *               message: 'json{token}'
 */
router.post("/user/login", userController.userLogin);
// url = http://localhost:3000/user/login

/**
 * @swagger
 * tags:
 *   - name: user
 *     description: Operations related to users
 * /user/delete/{email}:
 *   delete:
 *     summary: Allows a user to delete their account.
 *     tags:
 *       - user
 *     parameters:
 *       - in: path
 *         name: email
 *         description: User email to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Account deleted successfully'
 */

router.delete("/user/delete/:email", verifyToken, userController.userDelete);
// url = http://localhost:3000/user/delete/:email

/**
 * @swagger
 * tags:
 *   - name: user
 *     description: Operations related to users
 * /user/update/{email}:
 *   put:
 *     summary: Allows the user to modify their email (token).
 *     tags:
 *       - user
 *     headers:
 *       Authorization:
 *         description: JWT_KEY
 *     parameters:
 *       - in: path
 *         name: email
 *         description: User email to be updated.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: new-email@santa.com
 *             password: "new-secret"
 *     responses:
 *       200:
 *         description: Request successful.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Email updated successfully'
 */

router.put("/user/update/:email", verifyToken, userController.userUpdate);
// url = http://localhost:3000/user/update/:email

module.exports = router;
