const express = require("express");
const router = express.Router();
const santaController = require("../controllers/santaController");
const groupController = require("../controllers/groupController");
const userController = require("../controllers/userController");
const invitationController = require("../controllers/invitationController");

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
