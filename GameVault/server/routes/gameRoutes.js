const express = require("express");
const router = express.Router();

const { createGame, getAllGames, getSingleGame } = require("../controllers/gameController");
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");

router.post("/", protect, isAdmin, createGame);
router.get("/", getAllGames);
router.get("/:id", getSingleGame);

module.exports = router;
