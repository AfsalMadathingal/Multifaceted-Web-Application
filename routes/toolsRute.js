const express = require("express");
const router = express.Router();
const fs = require("fs");
const { uploadSingle } = require("../middleware/upload");
const { converterFunction } = require("../utils/imageToPdf");
const { v4: uuidv4 } = require("uuid");
const pageData = require("../public/json/pagetitles.json");


router.get("/", (req, res) => {
  res.render("tools", {
    title: pageData.toolspagetitle,
    desc: pageData.toolspagedescription,
    keywords: pageData.toolskeywords,
  });
});


router.get("/imagetopdf", (req, res) => {
  console.log("TOOLS ROUTE !!! ");
  res.render("imagetoPdf", {});
});


router.post("/imagetopdf", uploadSingle, async (req, res) => {
  console.log(req.files);

  const { filename } = req.files[0];
  const pngOutputName = uuidv4() + ".png";

  const response = await converterFunction(
    `./public/uploads/${filename}`,
    `./public/uploads/${pngOutputName}`
  );


  if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
    req.session.imageTodelete = `./public/uploads/${pngOutputName}`;
  } else {
    req.session.imageTodelete = `./public/uploads/${filename}`;
  }

  req.session.filename = pngOutputName;

  console.log("path ", response);

  const pdfName = response.pdfPath.split("/").pop();

  req.session.pdfName = `/pdf/${pdfName}`;

  try {
    fs.unlinkSync(req.session.imageTodelete);
    console.log("files deleted");
  } catch (error) {
    console.log(error);
  }

  res.json({ response: response, pdf: req.session.pdfName });
});



router.delete("/delete", (req, res) => {
  try {
    fs.unlinkSync(`./public/${req.session.pdfName}`);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }

  res.json("tools route delete");
});

module.exports = router;
