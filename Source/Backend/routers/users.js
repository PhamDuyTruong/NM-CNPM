const userControllers = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");
const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./public/images/avatars")
    },
    filename: function(req, file, cb){
        cb(null,  Date.now() + "_" + file.originalname) // dặt lại tên cho file
    }
})
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        const extensionImageList = [".png", ".jpg", ".jpeg"];
        const extension = file.originalname.slice(-4);
        const check = extensionImageList.includes(extension);
        if(check){
            cb(null, true);
        }else{
            cb(new Error("extention không hợp lệ"))
        }
    }
});

//Upload image
router.post("/upload-avatar", upload.single('avatar'), userControllers.uploadAvatar);

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