const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");
const { protect } = require("../middlewares/authmiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");

const { addToWishlist, getWishlist, removeFromWishlist,getProfile } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/profile", protect, (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "Welcome to your profile",
//         user: req.user
//     })
// });
router.get("/login", (req, res) => {
    res.render("users/login");
});
router.get("/register", (req, res) => {
    res.render("users/register");
});
router.get("/wishlist", protect, getWishlist);
router.get("/profile", protect, getProfile)
router.post("/wishlist/:gameId", protect, addToWishlist);

router.post("/logout", (req, res) => {

    res.clearCookie("token");

    res.json({
        success: true,
        message: "Logged out"
    });

});

router.delete("/wishlist/:gameId/", protect, removeFromWishlist);

module.exports = router;