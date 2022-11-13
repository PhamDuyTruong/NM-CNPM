
const orderControllers = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const router = require("express").Router();

//Create order
router.post("/", authMiddleware.verifyToken, orderControllers.createOrder);

// Get order
router.get("/", orderControllers.getAllOrders);
router.get("/:id", orderControllers.getOrderById);

// Get my order
router.get("/orders/me", authMiddleware.verifyToken, orderControllers.getMyOrders);

module.exports = router;

