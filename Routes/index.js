const express = require("express");
const router = express.Router();

const { mostFavourite } = require("../controllers/favourite_controller");

//home page
router.get("", async (req, res, next) => {
    res.send("API is running...");
});

//get most favourite teacher
router.get("/mostFavourite", mostFavourite);
module.exports = router;
