const authControllers = require("../controllers/authControllers");

const router = require("express").Router();

router.post("/register", authControllers.registerUser);
router.post("/login", authControllers.loginUser);
router.post("/refresh", authControllers.requestRefreshToken);
router.post("/password/forgot", authControllers.forgotPassword);
router.put("/password/reset/:token", authControllers.resetPassword);

module.exports = router;

