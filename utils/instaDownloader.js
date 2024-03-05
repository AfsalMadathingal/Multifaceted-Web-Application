const axios = require('axios');



async function instaDownload (url,callback) {
    
    const options = {
        method: 'GET',
        url: 'https://instagram-post-and-reels-downloader.p.rapidapi.com/',
        params: {
          url: url
        },
        headers: {
          'X-RapidAPI-Key':process.env.INSTA_API,
          'X-RapidAPI-Host': 'instagram-post-and-reels-downloader.p.rapidapi.com'
        }
      };
      
      
      
    
      
          console.log("downloading...");
          
          try {
              const response = await axios.request(options);

              console.log(response.data);
              callback(true,response.data)
      
          } catch (error) {
              console.error(false,error);
          }
      


}



module.exports = instaDownload

