const fs = require('fs');
const sizeOf = require('image-size');
const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const upload = require('../middleware/upload');



async function converterFunction(inputPath, outputPath) {
    try {
        let successful = false;

        // Function to convert JPG to PNG
        async function convertJpgToPng() {
            return new Promise((resolve, reject) => {
                if (inputPath.endsWith('.jpg') || inputPath.endsWith('.jpeg')) {
                    sharp(inputPath)
                        .png()
                        .toFile(outputPath, (err, info) => {
                            if (err) {
                                console.error('Error converting JPG to PNG:', err);
                                reject(err);
                            } else {
                                console.log('Conversion to PNG successful:', outputPath);
                                resolve(outputPath);
                            }
                        });
                } else {
                    console.log('Not a JPG file');
                    resolve(inputPath);
                }
            });
        }

        // Convert JPG to PNG
        const convertedImagePath = await convertJpgToPng();

        // Function to convert image to PDF
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
                console.log('Image converted to PDF successfully:', pdfPath);
                successful = true;
                return pdfPath;
            } catch (error) {
                console.error('Error converting image to PDF:', error);
                throw error;
            }
        }

        // Convert PNG to PDF
        const pdfPath = `./public/pdf/${uuidv4()}.pdf`;
        await convertImageToPdf(convertedImagePath, pdfPath);

        // Check if conversion was successful
        if (successful) {
            console.log('Conversion successful');
            return {
                status: true,
                pdfPath: pdfPath,
                imagePath: convertedImagePath
            };
        } else {
            console.log('Conversion failed');
            return {
                status: false,
                error: 'Conversion failed'
            };
        }
    } catch (error) {


        console.error('Error:', error);

        return {
            status: false,
            error: 'An error occurred'
        };

        
    }
}



module.exports = {converterFunction} 








