const User = require("../models/user")
const Game = require("../models/game");

exports.dashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalGames = await Game.countDocuments();

        res.render("admin/dashboard", {
            totalUsers, totalGames
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}