const fs = require('fs');
const path = require('path');


const directory = './public/uploads/';
const maxAgeInMs = 30 * 60 * 1000; 

function cleanup() {

    console.log("file cleanup");
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(directory, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error getting file stats:', err);
          return;
        }

        const fileAge = Date.now() - stats.mtime.getTime();
        if (fileAge > maxAgeInMs) {
          fs.unlink(filePath, err => {
            if (err) {
              console.error('Error deleting file:', err);
              return;
            }
            console.log('Deleted old file:', filePath);
          });
        }
      });
    });
  });
}

module.exports = cleanup


