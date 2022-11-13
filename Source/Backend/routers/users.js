const userControllers = require("../controllers/userControllers");
const router = require("express").Router();

// Get user
router.get("/", userControllers.getAllUser);
router.get("/:id", userControllers.getUserById);


module.exports = router;