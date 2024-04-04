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
          "Authorization": "Bearer 0fcfe460-f267-11ee-9301-25198f49eca6",
          "Content-Type": "application/json"
        }
      })
      
      
      return data


}

module.exports = {textToAudio}

