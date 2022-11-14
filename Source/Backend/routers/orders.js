
const orderControllers = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const router = require("express").Router();

//Create order
router.post("/", authMiddleware.verifyToken, orderControllers.createOrder);

// Get order
router.get("/admin", orderControllers.getAllOrders);
router.get("/admin/:id", orderControllers.getOrderById);

// Get my cart
router.get("/cart/me", authMiddleware.verifyToken, orderControllers.getMyOrders);

// Update order
router.put("/admin/status/:id", orderControllers.updateOrderByStatus);
router.put("/admin/:id", orderControllers.updateOrder);
//Delete order
router.delete("/admin/:id", orderControllers.deleteOrder);

module.exports = router;

