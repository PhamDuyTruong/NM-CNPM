const productControllers = require("../controllers/productControllers");

const router = require("express").Router();

// Create Product
router.post("/", productControllers.createProduct);

// Get Product
router.get("/", productControllers.getAllProducts);
router.get("/:id", productControllers.getProductById);

// Update Product
router.put("/:id", productControllers.updateProduct);

// Delete Product
router.delete("/:id", productControllers.deleteProduct);

module.exports = router;