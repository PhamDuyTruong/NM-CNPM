const userControllers = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");
const router = require("express").Router();

// Get user
router.get("/", userControllers.getAllUser);
router.get("/:id", userControllers.getUserById);

// Update User
router.put("/:id", userControllers.updateUser);

// Delete user
router.delete("/:id", userControllers.deleteUser);

// Get Profile
router.route("/me/profile").get(authMiddleware.verifyToken, userControllers.getUserProfile);
// Update profile
router.put("/me/profile", authMiddleware.verifyToken, userControllers.updateProfile)

module.exports = router;