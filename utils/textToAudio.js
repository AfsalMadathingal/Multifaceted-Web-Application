const axios = require('axios');

const textToAudio = async function  (text) 
{

    
   const data = await axios.post('https://developer.voicemaker.in/voice/api', {
        "Engine": "neural",
        "VoiceId": "ai3-Jony",
        "LanguageCode": "en-US",
        "Text": text,
        "OutputFormat": "mp3",
        "SampleRate": "48000",
        "Effect": "default",
        "MasterSpeed": "0",
        "MasterVolume": "0",
        "MasterPitch": "0"
      }, {
        headers: {
          "Authorization": "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json"
        }
      })
      
      
      return data


}

module.exports = {textToAudio}

