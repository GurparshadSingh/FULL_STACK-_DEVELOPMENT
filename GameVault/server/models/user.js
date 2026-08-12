const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    }
    ]

},
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema); 