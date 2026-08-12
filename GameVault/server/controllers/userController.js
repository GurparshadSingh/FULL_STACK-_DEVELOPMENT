const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.registerUser = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        // step2 checking if any fields are missing
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Step 3: Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username, email, password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: "User Registered successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
    // res.send("Register Route Working");
};



exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });


        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }

}


exports.addToWishlist = async (req, res) => {
    try {
        const { gameId } = req.params;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.wishlist.includes(gameId)) {
            return res.status(400).json({
                success: false,
                message: "Game already in wishlist"
            });
        }
        user.wishlist.push(gameId);
        await user.save();
        res.status(200).json({
            success: true,
            message: "Added to Wishlist"
        });

    } catch (err) {
        res.status(500).json({

            success: false,
            message: err.message

        });
    }
}


exports.getWishlist = async (req, res) => {
    const user = await User.findById(req.user.id)
        .populate("wishlist");
    res.render("wishlist_temp", { games: user.wishlist });

}

