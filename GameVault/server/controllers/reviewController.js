const Review = require("../models/review");
const Game = require("../models/game");
const review = require("../models/review");

exports.createReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const { gameId } = req.params;

        const game = await Game.findById(gameId);

        if (!game) {
            return res.status(404).json({
                message: "Game not found"
            });
        }

        const existingReview = await Review.findOne({
            user: req.user.id,
            game: gameId
        });

        if (existingReview) {
            return res.status(400).json({
                message: "You have already reviewed this game"
            });
        }


        const review = await Review.create({
            user: req.user.id,
            game: gameId,
            rating,
            comment
        });

        res.status(201).json({
            message: "Review added successfully",
            review
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


exports.getGameReviews = async (req, res) => {
    try {

        const { gameId } = req.params;
        const reviews = await Review.find({
            game: gameId
        }).populate("user", "username").sort({ createdAt: -1 })
        console.log(review);

        res.status(200).json({
            count: reviews.length,
            reviews
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}



exports.updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        // Only review owner can update
        if (review.user.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        review.rating = rating;
        review.comment = comment;

        await review.save();

        res.status(200).json({
            message: "Review updated successfully",
            review
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        // Only review owner can update
        if (review.user.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }
        await Review.findByIdAndDelete(reviewId);

        res.status(200).json({
            message: "Review deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}