const express = require("express");
const router = express.Router();

const { createReview, getGameReviews, updateReview, deleteReview } = require("../controllers/reviewController");

const { protect } = require("../middlewares/authmiddleware");

router.post(
    "/games/:gameId",
    protect,
    createReview
);


router.get(
    "/games/:gameId",
    getGameReviews
);


router.put(
    "/:reviewId",
    protect,
    updateReview
);


router.delete(
    "/:reviewId",
    protect,
    deleteReview
);


module.exports = router;


