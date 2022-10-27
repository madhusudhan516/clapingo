const express = require("express");
const router = express.Router();

router.get("", async (req, res, next) => {
    res.send("welcome to index route");
});

module.exports = router;
