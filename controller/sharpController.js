const sharp = require('sharp');



const scannerSharp = function (filename, sharpoutputName) {

    return new Promise((resolve, reject) => {
        
    sharp( `./public/uploads/${filename}`)
  // Resize to a higher resolution
  .resize({ width: 2000 })
  // Sharpen the image
  .sharpen({
    sigma: 10,   
    flat: 8,    
    jagged: 1   
  })

  .toFile(`./public/uploads/${sharpoutputName}`, (err, info) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
        resolve(`./public/uploads/${sharpoutputName}`);
      console.log('Image processed successfully');
    }

    
  });
    })

}

module.exports = scannerSharp