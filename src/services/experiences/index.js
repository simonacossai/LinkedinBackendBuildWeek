const express = require("express");
const Experiences = require("../../utilities/db").experiences;
const router = express.Router();

const multer = require("multer");
const cloudinary = require("../../utilities/cloudinary");
const upload = multer({});
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const PDFDocument = require("pdfkit");
const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "experiences",
  },
});
const cloudMulter = multer({
  storage: cloudStorage,
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
    const newExperience = await Experiences.create(req.body);
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
router.put(
  "/:id/upload",
  cloudMulter.single("experienceImage"),
  async (req, res, next) => {
    try {
      const newImage = {
        ...req.body,
        date: new Date(),
      };
      User.update(
        {
          image: req.file.path,
        },
        {
          returning: true,
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(201).send("updated");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.get("/:id/cv", async (req, res, next) => {
  try {
    let pdfDoc = new PDFDocument();
    const data = await User.findByPk(req.params.id);
    if (data) {
      res.setHeader("Content-Type", "application/pdf");
      pdfDoc.fontSize(30).text(`${data.name} ${data.surname} CV`, {
        width: 410,
        align: "center",
        height: 200,
        lineGap: 10,
      });

      pdfDoc.fontSize(12).text("- name: " + data.name, 100);
      pdfDoc.fontSize(12).text("- surname: " + data.surname, 100);
      pdfDoc.fontSize(12).text("- email: " + data.email, 100);
      pdfDoc.fontSize(12).text("- title: " + data.title, 100);
      pdfDoc.fontSize(12).text("- area: " + data.area, {
        lineGap: 22,
      });
      pdfDoc.fontSize(25).text("ABOUT ME", {
        lineGap: 10,
      });
      pdfDoc.fontSize(12).text(data.bio, {
        columns: 3,
        columnGap: 15,
        height: 100,
        width: 465,
        align: "justify",
      });
      pdfDoc.fontSize(15).text(" ", {
        lineGap: 13,
      });
      pdfDoc.fontSize(25).text("EXPERIENCES", {
        lineGap: 20,
      });
      pdfDoc.pipe(res);
      pdfDoc.end();
    } else {
      const err = new Error();
      next(err);
    }
  } catch (error) {
    next(error);
  }
});
module.exports= router