const express = require("express");
const router = express.Router();
const {Games} = require("../models");

router.get("/", async (req, res) => {
    const postGames = await Games.findAll();
    res.json(postGames);
});

router.post("/", async (req, res) => {
    const post = req.body;
    await Games.create(post); // save data in form of json in the exact format the table was formatted.
    res.json({Ok: post});
});

module.exports = router;
