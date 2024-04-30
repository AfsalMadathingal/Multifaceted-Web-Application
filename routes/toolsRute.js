const express = require("express");
const router = express.Router();
const sharp = require('sharp');
const fs = require("fs");
const { uploadSingle } = require("../middleware/upload");
const { converterFunction } = require("../utils/imageToPdf");
const { v4: uuidv4 } = require("uuid");
const pageData = require("../public/json/pagetitles.json");
const multer = require("multer");
const bunny = require("../utils/bunnyStorage");
const sharpCont = require ('../controller/sharpController');
const { title } = require("process");
const blog = require('../model/blog')
const audioConverter = require("../utils/ffmpeg");
router.get("/", (req, res) => {

  try {
    const dec =pageData.toolspagedescription;
    const keywords = pageData.toolskeywords;
    res.render("tools", {
      title: pageData.toolspagetitle,
      desc: dec,
      keywords: keywords,
      canonical: "https://iluvnet.in/tools",
    });
  } catch (error) {

    res.send("internal error Please go back home");
  }

});

router.get("/image-to-pdf", async (req, res) => {

try {
  
  const dec = pageData.imagetopdfdesctription;
  const keywords = pageData.imagetopdfkeywords;
  const blogData = await blog.find({}).sort({date:-1}).limit(12)
  res.render("imagetoPdf", {
    title: pageData.imagetopdftitle,
    desc: dec,
    blogData:blogData,
    keywords: keywords,
    canonical: "https://iluvnet.in/tools/image-to-pdf",
  });

} catch (error) {

  console.log(error);
  
  res.send("internal error Please go back home");
}



});

router.post("/imagetopdf", uploadSingle, async (req, res) => {
  console.log(req.files);

  const { filename } = req.files[0];
  const pngOutputName = uuidv4() + ".png";

  const response = await converterFunction(
    `./public/uploads/${filename}`,
    `./public/uploads/${pngOutputName}`
  );

  if (!response.status) {
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

router.post("/pdfapi", uploadSingle, async (req, res) => {
  console.log("api call");

  const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
        
        console.log(`ip address: ${ipAddress}`);

  try {
    const { filename } = req.files[0];
    const pngOutputName = uuidv4() + ".png";

    const response = await converterFunction(
      `./public/uploads/${filename}`,
      `./public/uploads/${pngOutputName}`
    );

    if (!response.status) {
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

    const bunnyRespose = await bunny.main(pdfName);
    res.json({ pdfLink: bunnyRespose });

    setTimeout(() => {
      try {
        fs.unlinkSync(`./public/${req.session.pdfName}`);
        req.session.destroy();
      } catch (error) {
        console.log(error);
        return res.json(error);
      }
    }, 5000);
  } catch (error) {
    console.log(error);

    res.json({ succuss: false, error: error });
  }
});

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


router.get('/camscanner-image-scanner', (req, res) => {

    res.render('imagescanner',{
      title:"Image Scanner | ILuvnet",
      desc:"How to scan an image ?",
      keywords:"Image Scanner, Image Scanner, How to scan an image",
      canonical:"https://iluvnet.in/tools/camscanner-image-scanner"
    })

    
})



router.post('/scan-image',uploadSingle, async (req, res) => {


try {

  console.log(req.files);

  const { filename } = req.files[0];
  const pngOutputName = uuidv4() + ".png";
  let sharpoutputName ;
  if(filename.endsWith(".jpg") || filename.endsWith(".jpeg")){

    sharpoutputName = uuidv4() + ".jpeg";
  }else
  {
    sharpoutputName = uuidv4() + ".png";
  }
 

  await sharpCont(filename, sharpoutputName);

  console.log(sharpoutputName);
  

  const response = await converterFunction(
    `./public/uploads/${sharpoutputName}`,
    `./public/uploads/${pngOutputName}`
  );

  if (!response.status) {
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
  
} catch (error) {
  

  res.json(false);

}


  
 
})


router.get('/sip-calculator', (req, res) => {

  try {
    
    res.render('sipcalc',{
      title:"SIP Calculator | ILuvnet",
      desc:"Calculate your SIP amount here , how to calculate SIP amount ?",
      keywords:"SIP, SIP Calculator, SIP amount, SIP calculator, How to calculate SIP amount",
      canonical:"https://iluvnet.in/tools/sip-calculator" 
    })

  } catch (error) {
    console.log(error) ;
    res.send("internal error Please go back home")
  }
})

router.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) {
    console.log("errororororo");

    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        status: false,
        message: "File size limit exceeded (Max: 2MB)",
      });
    } else {
      return res
        .status(500)
        .json({ status: false, message: "Uploading error occurred" });
    }
  } else {
   
console.log(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
});


router.post('/wav-to-mp3',async (req, res) => { 

  try {

    const url = req.body.url

    console.log("url",url);

    const output = await audioConverter.convertFile(url)

    res.json({output:output})

    console.log(output);

  } catch (error) {
    
  }
} )




module.exports = router;
