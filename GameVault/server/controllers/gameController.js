const Game = require("../models/game");
const User = require("../models/user.js");

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
    // const token = localStorage.getItem("token");
    // if (!token) {
    //     window.location.href = "/login";
    // }
    const games = await Game.find();
    // console.log(games);
    res.render("games/index", {
        games, isLoggedIn: !!req.cookies.token
    });
    // try {
    //     const games = await Game.find();
    //     res.status(200).json({
    //         success: true,
    //         count: games.length,
    //         games
    //     });
    // } catch (err) {
    //     res.status(500).json({
    //         success: false,
    //         message: err.message
    //     });
    // }
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
        });
        res.render("games/search", { games });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.getGenreGames = async (req, res) => {
    try {
        const genre = req.query.genre;

        const games = await Game.find({
            genre: genre
        })
        res.render("games/index", { games, isLoggedIn: !!req.cookies.token });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

