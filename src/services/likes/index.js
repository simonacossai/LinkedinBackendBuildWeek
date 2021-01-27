const express = require("express");
const { Op } = require("sequelize");
const Like = require("../../utilities/db").Like;
const User = require("../../utilities/db").User;
const Post = require("../../utilities/db").Post;
// ROUTER
const router = express.Router();

/* get /:postId   
await Like.count({where:{postID:req.params.postId}}) 
check if this specific user liked this specific post
if liked?  isliked:true else isLiked
*/

router.post("/:postId/:userId", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.postId);
    const user = await User.findByPk(req.params.userId);

    if (post && user) {
      const newLike = await Like.create({
        postId: req.params.postId,
        userId: req.params.userId,
      });
      res.send(newLike);
    } else {
      await Like.destroy();
      res.send();
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

/*res.send({likes:totalCount, isLiked:true/false
})
*/

/**
 * post /:postId/:userId
 *
 * ..check id user liked this post before
 * if liked ? delete
 * else create
 */

module.exports = router;
