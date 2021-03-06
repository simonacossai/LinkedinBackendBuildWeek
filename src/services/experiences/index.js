const express = require("express");
const Experience = require("../../utilities/db").Experience;
const router = express.Router();
const verify = require("../auth/verifyToken");
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
router.get("/profile/userName/experiences/CSV", async (req, res, next) => {
  try {
    let pdfDoc = new PDFDocument();
    const data = await Experience.findAll();
    if (data) {
      data.map((experience)=>{
      res.setHeader("Content-Type", "application/pdf");
      
      pdfDoc.fontSize(30).text(`${experience.role} ${experience.company}`, {
        width: 410,
        align: "center",
        height: 200,
        lineGap: 10,
      });
        
      pdfDoc.fontSize(11).text("- role: " + experience.role, 100);
      pdfDoc.fontSize(11).text("- company: " + experience.company, 100);
      pdfDoc.fontSize(11).text("- startDate: " + experience.startDate, 100);
      pdfDoc.fontSize(11).text("- endDate: " + experience.endDate, 100);
      pdfDoc.fontSize(11).text("- area: " + experience.area, {
        lineGap: 22,
      });
    })
     
      pdfDoc.fontSize(12).text(data.username, {
        columns: 3,
        columnGap: 15,
        height: 100,
        width: 465,
        align: "justify",
      });
      pdfDoc.fontSize(15).text(" ", {
        lineGap: 13,
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
router.get("/profile/userName/experiences/:userId", async (req, res, next)=> {
  try {
    const singleExperince = await Experience.findAll({where: { userId: req.params.userId},});
    res.status(200).send(singleExperince);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.put("/profile/userName/experiences/:expId", async (req, res, next)=> {
  try {
    const updatedExperince = await Experience.update(req.body, {
      returning: true,
      plain: true,
      where: {
        id: req.params.expId,
      },
    });
    res.send(updatedExperince);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.get("/profile/userName/experiences",async (req, res, next)=>{
  try {
    const AllExperiences = await Experience.findAll();
    res.send(AllExperiences);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/profile/userName/experiences", verify, async (req, res,next) => {
  try {
   console.log(req.body)
    const newExperience = await Experience.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).send(newExperience);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
    next(error)
  }
});


router.delete("/profile/userName/experiences/:expId", async (req, res, next) => {
  try {
    await Experience.destroy({
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
  verify,
cloudMulter.single("experienceImage"),
  async (req, res, next) => {
    try {
      console.log(req.file.path)
      const alteredExperience = await Experience.update(
        { image: req.file.path },
        {
          where: { id: req.params.id },
          returning: true,
        }
      );
      res.send(alteredExperience);
      console.log(req.file.path)
     
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);


module.exports= router