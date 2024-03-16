const express = require("express");
const router = express.Router();
const fs = require("fs");
const { uploadSingle } = require("../middleware/upload");
const { converterFunction } = require("../utils/imageToPdf");
const { v4: uuidv4 } = require("uuid");
const pageData = require("../public/json/pagetitles.json");
const multer = require("multer");
const bunny = require('../utils/bunnyStorage');


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

  if (!response.status)
  {
    return res.json(response);
  }


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
    console.log("no files to delete");
    console.log(error);
  }

  res.json({ response: response, pdf: req.session.pdfName });
});


router.post('/pdfapi',uploadSingle, async (req, res) => {


  console.log("api call");

  try {

  const { filename } = req.files[0];
  const pngOutputName = uuidv4() + ".png";

  const response = await converterFunction(
    `./public/uploads/${filename}`,
    `./public/uploads/${pngOutputName}`
  );



  if (!response.status)
  {
    return res.json(response);
  }


  if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
    req.session.imageTodelete = `./public/uploads/${pngOutputName}`;
  } else {
    req.session.imageTodelete = `./public/uploads/${filename}`;
  }

  req.session.filename = pngOutputName;

  console.log("path ", response);

  const pdfName = response.pdfPath.split("/").pop();

  req.session.pdfName = `/pdf/${pdfName}`;

  fs.unlinkSync(req.session.imageTodelete);
  console.log("images deleted");

  const bunnyRespose = await bunny.main(pdfName)
  res.json({ pdfLink: bunnyRespose });

  setTimeout(() => {

    try {
      fs.unlinkSync(`./public/${req.session.pdfName}`);
      req.session.destroy();
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
    
  },5000)
    
  } catch (error) {

    console.log(error);
    
    res.json({succuss: false, error: error})
  }



})



router.delete("/delete", (req, res) => {
  try {
    fs.unlinkSync(`./public/${req.session.pdfName}`);
    req.session.destroy();
  } catch (error) {
    console.log(error);
    return res.json(error);
  }

  res.json("tools route delete");
});


router.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) {
    
      console.log("errororororo");
      
    if (err.code === 'LIMIT_FILE_SIZE') {

      return res.status(400).json({status: false, message: 'File size limit exceeded (Max: 2MB)' });

    } else {
      return res.status(500).json({ status: false, message: 'Uploading error occurred' });
    }
  } else {
    return res.status(500).json({status: false,  message: 'Internal server error' });
  }
});





module.exports = router;
