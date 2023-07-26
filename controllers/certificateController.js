const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const Certificate = require("../models/Certificate.js");

const createCertificate = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: "certificaImages",
      }
    );

    console.log("result: ", result);

    await Certificate.create({
      name: req.body.name,
      description: req.body.description,
      user: res.locals.user._id,
      url: result.secure_url,
    });
    fs.unlinkSync(req.files.image.tempFilePath);
    res.status(201).redirect("/certificates");

  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during image upload.");
  }
};
const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({user:res.locals.user._id});
    // const certificates = await Certificate.find({});
    res.status(200).render("certificates", {
      certificates,
    });
  } catch (error) {
    succeded: false, error;
  }
};
const getACertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById({ _id: req.params.id });
    res.status(200).render("certificate", {
      certificate,
    });
  } catch (error) {
    succeded: false, error;
  }
};

module.exports = { createCertificate, getAllCertificates, getACertificate };
