const productControllers = require("../controllers/productControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = require("express").Router();

// Create Product
router.post("/", authMiddleware.authorizeRole, productControllers.createProduct);

// Get Product
router.get("/", productControllers.getAllProducts);
router.get("/:id", productControllers.getProductById);

// Update Product
router.put("/:id", authMiddleware.authorizeRole, productControllers.updateProduct);

// Delete Product
router.delete("/:id", authMiddleware.authorizeRole, productControllers.deleteProduct);

//Create product reviews
router.post("/:id/review",authMiddleware.verifyToken, productControllers.createProductReview);

module.exports = router;