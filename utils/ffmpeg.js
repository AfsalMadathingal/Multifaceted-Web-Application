const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// const inputFile = '/path/to/input.wav';


const convertFile = (inputFile) => {
    
try {
    
    // Set the path to ffmpeg executable
    ffmpeg.setFfmpegPath('/usr/bin/ffmpeg');

    // Define the directory where you want to save the output file
    const outputDirectory = path.join(__dirname, 'public', 'uploads');

    // Ensure the output directory exists, if not, create it
    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory, { recursive: true });
    }

    return new Promise((resolve, reject) => {
        const otname = uuidv4();
        const outputFile = `${outputDirectory}/${otname}.mp3`;
        console.log(outputFile);
        ffmpeg(inputFile)
            .outputOptions(['-c:a libmp3lame', '-qscale:a 2'])
            .output(outputFile)
            .on('end', () => {
                console.log('Conversion from WAV to MP3 finished');
                resolve(`https://iluvnet.com/uploads/${otname}.mp3`);
            })
            .on('error', (err) => {
                console.error('Error occurred:', err);
                reject(err);
            })
            .run();
    });

} catch (error) {
    
    console.log(error); 
    return new Promise((resolve, reject) => {
        reject(error);
    })
}
    
};



module.exports = {
    convertFile
}
