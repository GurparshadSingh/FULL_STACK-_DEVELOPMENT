const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    genre: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    developer: {
        type: String,
        required: true
    },
    publisher: {
        type: String
    },
    image: {
        type: String,
        default: ""
    },
    releaseYear: {
        type: Date
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }

}, { timestamps: true });

module.exports = mongoose.model("Game", gameSchema);