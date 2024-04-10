const fs = require('fs');
const axios = require('axios');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const saveAudio = async (mp3Url,) => {

    try {

        const filename = `${uuidv4()}.mp3`;
        const filePath = path.join(__dirname, '..', 'public', 'audio',filename);

        async function saveMP3ToServer(mp3Url) {
            try {
              // Fetch the MP3 file
              
              const response = await axios.get(mp3Url, { responseType: 'stream' });
          
              // Create a writable stream to save the file
              const writer = fs.createWriteStream(filePath);
          
              // Pipe the response data to the writable stream
              response.data.pipe(writer);
          
              // Wait for the file to finish writing
              await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
              });
          
              console.log('MP3 file saved successfully!');
              return filename;
            } catch (error) {
              console.error('Error saving MP3 file:', error);
              return null;
            }
          }
       return  audioPath =  await  saveMP3ToServer(mp3Url, filePath);

    } catch (error) {

        console.log(error);
        
    }


}


module.exports = {saveAudio}