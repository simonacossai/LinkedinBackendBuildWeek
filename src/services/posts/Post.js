const express = require("express");

const Post = require("../../db").Post;

const router = express.Router();

// ADD NEW POST
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).send(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
});

// Get a specific post
router.get("/:id", async (req, res) => {
  try {
    const requestedPost = await Post.findAll({ where: { _id: req.params.id } });
    res.send(requestedPost);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
