const express = require("express");
const Experiences = require("../utilities/database").experiences;
const router = express.Router();

router.get("/", async (res, req, next) => {
  try {
    const AllExperiences = await Experiences.findAll();
    res.status(200).send(AllExperiences);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.get("/profile/userName/experiences/:expid", async (res, req, next) => {
  try {
    const singleExperince = await findByPk(req.params.expid);
    res.status(200).send(singleExperince);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.put("/profile/userName/experiences/:expid", async (res, req, next) => {
  try {
    const updatedExperince = await Experiences.update(req.body, {
      where: { id: req.params.expid },
      returning: true,
    });
    res.send(updatedExperince);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.get("/profile/userName/experiences",async (res, req, next)=>{
  try {
    const AllExperiences = await Experiences.findAll();
    res.status(200).send(AllExperiences);
  } catch (error) {
    console.log(error);
    next(error);
  }
});