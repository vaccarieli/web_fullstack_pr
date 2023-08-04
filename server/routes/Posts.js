const express = require("express");
const router = express.Router();
const {Posts} = require("../models");

router.use(express.json()); // Use json parser middleware to parse JSON data

router.get("/", async (req, res) => {
    const postData = await Posts.findAll();
    res.json(postData);
});

router.post("/", async (req, res) => {
    const post = req.body;
    await Posts.create(post); // save data in form of json in the exact format the table was formatted.
    res.json({Ok: post});
});

module.exports = router;
