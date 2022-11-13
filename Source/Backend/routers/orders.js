
const orderControllers = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const router = require("express").Router();

//Create order
router.post("/", authMiddleware.verifyToken, orderControllers.createOrder);



module.exports = router;

