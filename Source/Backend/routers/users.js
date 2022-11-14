const userControllers = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");
const router = require("express").Router();

// Get user
router.get("/admin",authMiddleware.authorizeRole, userControllers.getAllUser);
router.get("/:id", authMiddleware.authorizeRole, userControllers.getUserById);

// Update User
router.put("/admin/:id", authMiddleware.authorizeRole, userControllers.updateUser);

// Delete user
router.delete("/admin/:id", authMiddleware.authorizeRole, userControllers.deleteUser);

// Get Profile
router.route("/me/profile").get(authMiddleware.verifyToken, userControllers.getUserProfile);
// Update profile
router.put("/me/profile", authMiddleware.verifyToken, userControllers.updateProfile)

module.exports = router;