const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const userController = require("../controllers/userController");
const invitationController = require("../controllers/invitationController");
const { verifyToken } = require("../middlewares/jwtMiddleware");

/**
 * @swagger
 * tags:
 *   - name: invitation
 *     description: Operations related to invitations
 * /invitation/accept/{invitationId}:
 *   put:
 *     summary: Accepts an invitation.
 *     tags:
 *       - invitation
 *     parameters:
 *       - in: path
 *         name: invitationId
 *         description: The ID of the invitation to be accepted.
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Invitation accepted successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Invitation accepted successfully'
 *       403:
 *         description: Not authorized to accept this invitation.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Not authorized to accept this invitation'
 *       404:
 *         description: Invitation not found.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Invitation not found'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Server Error'
 */
router.put(
  "/invitation/accept/:invitationId",
  verifyToken,
  invitationController.acceptInvitation
);
// URL = http://localhost:3000/invitation/accept/:invitationId

module.exports = router;
