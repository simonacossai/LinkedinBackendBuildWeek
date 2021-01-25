const express = require("express");
const User = require("../../db").User;
const { Op } = require("sequelize");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const upload = multer({});
const router = express.Router();

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "users",
  },
});
const cloudMulter = multer({ storage: cloudStorage });

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await User.findAll({});
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newElement = await User.create(req.body);
      res.send(newElement);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await User.findByPk(req.params.id);
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedData = await User.update(req.body, {
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
      User.destroy({ where: { id: req.params.id } }).then((rowsDeleted) => {
        if (rowsDeleted > 0) res.send("Deleted");
        else res.send("no match");
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router.post(async (req, res, next) => {
  try {
    const newElement = await User.update(req.body);
    res.send(newElement);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.put(
  "/:id/upload",
  cloudMulter.single("userImage"),
  async (req, res, next) => {
    try {
      const newImage = { ...req.body, date: new Date() };
      User.update(
        { image: req.file.path },
        { returning: true, where: { id: req.params.id } }
      );

      res.status(201).send("updated");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

module.exports = router;
