const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/userRoutes");
const bcrypt = require("bcrypt");
const gameRoutes = require("./routes/gameRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const path = require("path");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db.js");
connectDB();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/users", userRoutes);

app.use("/api/games", gameRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/admin", adminRoutes)

app.get('/', (req, res) => {
    res.send('Welcome to GameVault API!');
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`app is running at: ${PORT} port`);
});