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

/**
 * @swagger
 * paths:
 *   /group/{group_id}/{admin_id}/invite:
 *     post:
 *       summary: Creates invitation for a group
 *       description: |
 *         This endpoint allows an admin to create an invitation for a person.
 *         The `group_id` parameter represents the ID of the group, and the `admin_id` parameter represents the ID of the admin.
 *         The request should include the `user_id` in the request body to specify the user to be invited.
 *       parameters:
 *         - in: path
 *           name: group_id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the group
 *         - in: path
 *           name: admin_id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the admin
 *         - in: header
 *           name: Authorization
 *           required: true
 *           schema:
 *             type: string
 *           description: Bearer token for authentication
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   description: The ID of the user to be invited
 *       responses:
 *         '201':
 *           description: Invitation created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   invitation:
 *                     type: object
 *                     description: The created invitation
 *                     properties:
 *                       _id:
 *                         type: string
 *                       group_id:
 *                         type: string
 *                       group_name:
 *                         type: string
 *                       admin_id:
 *                         type: string
 *                       invitedUsers:
 *                         type: array
 *                         items:
 *                           type: string
 *                       accepted:
 *                         type: boolean
 *                       token:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                       updated_at:
 *                         type: string
 *         '400':
 *           description: Bad Request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Description of the error
 *         '403':
 *           description: Forbidden
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Description of the error
 *         '404':
 *           description: Not Found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Description of the error
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Description of the error
 */

router.post(
  "/group/:group_id/:admin_id/invite",
  verifyToken,
  groupController.createInvitation
);

module.exports = router;
