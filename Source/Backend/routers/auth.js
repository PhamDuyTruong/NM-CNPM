const authControllers = require("../controllers/authControllers");

const router = require("express").Router();

router.post("/register", authControllers.registerUser);
router.post("/login", authControllers.loginUser);
router.post("/refresh", authControllers.requestRefreshToken);

module.exports = router;

