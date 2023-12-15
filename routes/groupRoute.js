const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/jwtMiddleware");

/**
 * @swagger
 * /group/create:
 *  post:
 *      summary: Allows a user to create a group and add the ID of the people he wants to invite in it. Creates an Invitation model for each user_id in the InvitedUsers array
 *      requestBody:
 *          required: true
 *          content:
 *          application/json:
 *              example:
 *                  name: "Group1"
 *                  admin_id: taken from the token
 *                  InvitedUsers: [user_id1, user_id2]
 *                  Invitation: [group_id, group_name, admin_id, user_id, accepted: default->null]
 *      responses:
 *          201:
 *              description: Request successful.
 *              content:
 *                  application/json:
 *                      example:
 *                          message: 'json{group}''json{Invitation}'
 */
router.post("/group/create", verifyToken, groupController.createAGroup);

module.exports = router;
