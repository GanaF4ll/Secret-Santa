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

/**
 * @swagger
 * tags:
 *   - name: invitation
 *     description: Operations related to invitations
 * /invitation/decline/{invitationId}:
 *   put:
 *     summary: Decline an invitation
 *     tags:
 *       - invitation
 *     parameters:
 *       - in: path
 *         name: invitationId
 *         description: The ID of the invitation to decline
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invitation declined successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Invitation declined successfully'
 *       403:
 *         description: |
 *           Unauthorized access: invalid user for this invitation.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Unauthorized access: invalid user for this invitation'
 *       404:
 *         description: |
 *           Invitation not found or already processed.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Invitation not found or already processed'
 *       500:
 *         description: |
 *           Server error.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Server Error'
 */

router.put(
  "/invitation/decline/:invitationId",
  verifyToken,
  invitationController.declineInvitation
);
// URL = http://localhost:3000/invitation/decline/:invitationId

module.exports = router;
