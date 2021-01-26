const router = require("express").Router();
const User = require("../../utilities/db").User;
const verify = require("./verifyToken");

router.get('/', verify, async (req, res, next)=>{
    try {
        const data = await User.findOne({id: req.user._id});
        res.send(data);
    } catch (error) {
        
    }
})


module.exports= router
