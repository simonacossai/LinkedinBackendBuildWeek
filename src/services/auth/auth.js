const router = require("express").Router();
const User = require("../../utilities/db").User;
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('../validation');
const bcrypt= require('bcryptjs')

router.post('/register', async(req, res, next)=>{
   
    //validate data before creating new user
    try {
        const {error}= registerValidation(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }

        //check if email already exists
        const emailExist = await User.findAll({
            where: {
              email: req.body.email
            }
          })
        if(emailExist && emailExist.length > 0) {
           return res.status(400).send("email already exists")
        }

        //hash passwords 
        const salt = await bcrypt.genSalt(10)  //decide the complexity of the string generated
        const hashedPassword = await bcrypt.hash(req.body.password, salt); //creation of the crypted password that only bcrypt can understand

        const user = {
            name: req.body.name, 
            surname: req.body.surname, 
            email: req.body.email,
            bio: req.body.bio,
            title: req.body.title,
            area: req.body.area,
            image: req.body.image,
            username: req.body.username,
            password: hashedPassword,
        };
            const savedUser = await User.create(user)
            res.send({savedUser: savedUser.id});
        
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
        next(error)
    }
})


router.post("/login", async (req, res, next) => {
        try {
        const {error}= loginValidation(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }

        const user = await User.findAll({
            where: {
              email: req.body.email
            }
          })
        if(user.length===0) {
           return res.status(400).send("email does not exists")
        }

        const validPassword =await bcrypt.compare(req.body.password, user[0].password);
        if(!validPassword) { return res.status(400).send("Invalid password")}
        


        //create and assign a token

        const token = jwt.sign({_id: user[0].id}, process.env.TOKEN_SECRET)
        res.header('auth-token', token)
        res.send({token: token, _id: user[0].id})
        } catch (e) {
            console.log(e)
            next(e)
        }
})


module.exports = router




