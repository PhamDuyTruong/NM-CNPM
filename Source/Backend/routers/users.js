const userControllers = require("../controllers/userControllers");
const router = require("express").Router();

// Get user
router.get("/", userControllers.getAllUser);
router.get("/:id", userControllers.getUserById);

// Update User
router.put("/:id", userControllers.updateUser);

// Delete user
router.delete("/:id", userControllers.deleteUser);

module.exports = router;