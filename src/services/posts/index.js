const express = require("express");

const Post = require("../../utilities/db").Post;
// const Like = require("../../db").User;

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

// GET ALL POSTS with likes
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({});
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
});

// Get a specific post with likes
router.get("/:id", async (req, res) => {
  try {
    const requestedPost = await Post.findOne({
      where: { _id: req.params.id },
    });
    res.send(requestedPost);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
});

// Modify a post
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: { _id: req.params.id },
      returning: true,
      plain: true,
    });
    res.send(updatedPost[1]);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  try {
    await Post.destroy({ where: { _id: req.params.id } }).then((deleted) => {
      if (deleted === 1) res.send("Deleted!");
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
