const express = require("express");
const router = express.Router();
const santaController = require("../controllers/santaController");
const groupController = require("../controllers/groupController");
const userController = require("../controllers/userController");
const invitationController = require("../controllers/invitationController");

/**
 * @swagger
 * tags:
 *   - name: santa
 *     description: Operations related to Secret Santa
 * /santa/launch/{groupId}:
 *   post:
 *     summary: Assign Secret Santas
 *     tags:
 *       - santa
 *     parameters:
 *       - name: groupId
 *         in: path
 *         description: The ID of the group for Secret Santa assignment
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Secret Santas assigned successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Secret Santas assigned successfully!
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Internal server error
 */

router.post("/santa/launch/:groupId", async (req, res) => {
  const groupId = req.params.groupId;

  try {
    // Call the assignSecretSantas function with the groupId
    await santaController.assignSecretSantas(groupId);

    // Respond with success message or other appropriate response
    res.status(200).json({ message: "Secret Santas assigned successfully!" });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
