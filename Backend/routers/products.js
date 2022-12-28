const productControllers = require("../controllers/productControllers");
const authMiddleware = require("../middleware/authMiddleware");
const { route } = require("./orders");
const multer = require("multer");

const router = require("express").Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./public/images/products")
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "_" +  file.originalname) // dặt lại tên cho file
    }
})
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        const extensionImageList = [".png", ".jpg", "jpeg"];
        const extension = file.originalname.slice(-4);
        const check = extensionImageList.includes(extension);
        if(check){
            cb(null, true);
        }else{
            cb(new Error("extention không hợp lệ"))
        }
    }
});

// Create Product
router.post("/admin", authMiddleware.authorizeRole, productControllers.createProduct);

// Get Product
router.get("/", productControllers.getAllProducts);
router.get("/:id", productControllers.getProductById);

// Update Product
router.put("/admin/:id", authMiddleware.authorizeRole, productControllers.updateProduct);

// Delete Product
router.delete("/admin/:id", authMiddleware.authorizeRole, productControllers.deleteProduct);

//Create product reviews
router.post("/:id/review",authMiddleware.verifyToken, productControllers.createProductReview);

// Get product review
router.get("/user/reviews", authMiddleware.verifyToken, productControllers.getProductReview);

// Delete product review
router.delete("/user/review", authMiddleware.verifyToken, productControllers.deleteReview);

//Search product
router.get("/name/search", productControllers.searchProductByName);

//upload image product
router.post("/admin/upload-image/:id", authMiddleware.authorizeRole, upload.single('product'), productControllers.uploadImage);

module.exports = router;