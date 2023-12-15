const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/jwtMiddleware");

/**
 * @swagger
 * /group/create:
 *  post:
 *      summary: Allows a user to create a group and add the ID of the people he wants to invite in it.
 *      requestBody:
 *          required: true
 *          content:
 *          application/json:
 *              example:
 *                  name: "Group1"
 *                  admin_id: taken from the token
 *                  InvitedUsers: [user_id1, user_id2]
 *      responses:
 *          201:
 *              description: Request successful.
 *              content:
 *                  application/json:
 *                      example:
 *                          message: 'json{group}'
 */
router.post("/group/create", verifyToken, groupController.createAGroup);

module.exports = router;
