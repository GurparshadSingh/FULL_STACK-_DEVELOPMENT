const game = require("../models/game");
const Game = require("../models/game");
const User = require("../models/user.js");
// const admin_check = require("../middlewares/adminmiddleware.js")
exports.createGame = async (req, res) => {
    try {
        const game = await Game.create(req.body);
        res.status(201).json({
            success: true,
            message: "Game Added Successfully",
            game
        });
    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.getAllGames = async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const totalGames = await Game.countDocuments();
    const totalPages = Math.ceil(totalGames / limit);

    const games = await Game.find().skip(skip).limit(limit);


    const isAdmin = req.user && req.user.role === "admin";

    res.render("games/index", {
        games,
        currPage: page,
        totalPages,
        isLoggedIn: !!req.cookies.token,
        isAdmin
    });

};

exports.getSingleGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).send("Game Not Found");
        }
        res.render("games/oneGame", { game });
    } catch (error) {
        res.status(500).send(err.message);
    }
};

exports.getSearchedGame = async (req, res) => {
    try {
        const query = req.query.query;
        const games = await Game.find({
            title: {
                $regex: query,
                $options: "i"
            }
        })

        res.render("games/search", { games, });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.getGenreGames = async (req, res) => {
    try {
        const genre = req.query.genre;

        const page = Number(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const filter = {
            genre: genre
        };

        const totalGames = await Game.countDocuments(filter);
        const totalPages = Math.ceil(totalGames / limit);



        const games = await Game.find(filter)
            .skip(skip)
            .limit(limit)

        res.render("games/index", {
            games, currPage: page, totalPages, genre: genre, isLoggedIn: !!req.cookies.token
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
}



exports.deleteGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) {
            return res.status(404).json({
                success: false,
                message: "Game not found"
            })
        }

        res.json({
            success: true,
            message: "Game deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}