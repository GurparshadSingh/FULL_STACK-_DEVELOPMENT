const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Game = require("../models/game");
const games = require("../data/games.json");

// console.log(process.env.MONGODB_URI);
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://gurparshad0878_db_user:HD0bjiGx4Yk9XOFZ@gamevaultcluster.vl3vkcl.mongodb.net");

        console.log("MongoDB Connected");
        await Game.deleteMany();

        await Game.insertMany(games);

        console.log("30 Games Inserted Successfully");

        process.exit();
    } catch (error) {
        console.log(error);
    }
}

connectDB();




