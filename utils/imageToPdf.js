const fs = require('fs');
const sizeOf = require('image-size');
const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const upload = require('../middleware/upload');



const inputPath = 'IMG-20231120-WA0068.jpg'; 
const outputPath = 'output.png';

function convertJpgToPng ()  {

  return  new Promise((resolve,reject)=>{

        sharp(inputPath)
        .png()
        .toFile(outputPath, (err, info) => {
            if (err) {
                console.error('Error converting JPG to PNG:', err);
                reject();
            } else {
                console.log('Conversion successful:', info);
                resolve();
            }
        });
    });
} 


async function converterFunction () {

    convertJpgToPng(inputPath, outputPath).then((result) => {

        console.log('Conversion successful:', result);
        async function convertImageToPdf(imagePath, pdfPath) {
            try {
               
                const dimensions = sizeOf(imagePath);
                
               
                const pdfDoc = await PDFDocument.create();
                const page = pdfDoc.addPage([dimensions.width, dimensions.height]);
                
               
                const imageBytes = fs.readFileSync(imagePath);
                const image = await pdfDoc.embedPng(imageBytes);
                page.drawImage(image, {
                    x: 0,
                    y: 0,
                    width: dimensions.width,
                    height: dimensions.height,
                });
                
               
                const pdfBytes = await pdfDoc.save();
                fs.writeFileSync(pdfPath, pdfBytes);
                
                console.log('Image converted to PDF successfully!');
            } catch (error) {
                console.error('Error:', error);
            }
        }
        
       
       
        const imagePath = outputPath; 
        const pdfPath = uuidv4()+`.pdf`; 
        
        convertImageToPdf(imagePath, pdfPath);
        
    }).catch((err) => {
        
    });

}

converterFunction();








