const express = require("express");
const Comment = require("../../utilities/db").Comment;
const { Op } = require("sequelize");
const router = express.Router();
const verify = require("../auth/verifyToken");
const User = require("../../utilities/db").User;

router
  .route("/:id")
  .get(verify, async (req, res, next) => {
    try {
      const data = await Comment.findByPk(req.params.id);
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
 
  .put(verify, async (req, res, next) => {
    try {
      const updatedData = await Comment.update(req.body, {
        returning: true,
        plain: true,
        where: {
          id: req.params.id,
        },
      });
      res.send(updatedData[1]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      Comment.destroy({
        where: {
          id: req.params.id,
        },
      }).then((rowsDeleted) => {
        if (rowsDeleted > 0) res.send("Deleted");
        else res.send("no match");
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  });
  router.post("/", verify, async (req, res,next) => {
    try {
     const data = await User.findByPk(req.user._id, {attributes:['username']});
     console.log(req.body)
      const newComment = await Comment.create({
        ...req.body,
        userId: req.user._id,
        name: data.username
      });
      res.status(201).send(newComment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
      next(error)
    }
  });



module.exports = router;
