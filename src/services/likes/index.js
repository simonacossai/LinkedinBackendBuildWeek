const express = require("express");
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
    const user = await User.findOne({ where: { id: req.params.userId } });
    const post = await Post.findOne({ where: { _id: req.params.postId } });
    const like = await Like.findOne({ where: { isLiked } });
    if (!like) {
      const newLike = await Like.create({});
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
