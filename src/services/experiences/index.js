const express = require("express");
const Experiences = require("../../utilities/db").experiences;
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
router.get("/profile/userName/experiences/:expId", async (res, req, next) => {
  try {
    const singleExperince = await findByPk(req.params.expId);
    res.status(200).send(singleExperince);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.put("/profile/userName/experiences/:expId", async (res, req, next) => {
  try {
    const updatedExperince = await Experiences.update(req.body, {
      where: { id: req.params.expId },
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
router.post("/profile/userName/experiences",async (res, req, next)=>{
  try {
    const newExperience = await Experiences.create(re.body);
    res.status(200).send(newExperience);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.delete("/profile/userName/experiences/:expId", async (req, res, next) => {
  try {
    await Experiences.destroy({
      where: { id: req.params.expId},
    });
    res.send("Experience Deleted");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports= router