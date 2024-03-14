const axios = require('axios');
const { igdl } = require('btch-downloader')


async function main() {
    
    const url = 'https://www.instagram.com/reel/C4gAb5GSvzr/?utm_source=ig_web_copy_link'
    const data = await igdl(url)
    console.log(data) 
}




async function instaDownload (url,ip,callback) {
    
    // const options = {
    //     method: 'GET',
    //     url: 'https://instagram-post-and-reels-downloader.p.rapidapi.com/',
    //     params: {
    //       url: url
    //     },
    //     headers: {
    //       'X-RapidAPI-Key':process.env.INSTA_API,
    //       'X-RapidAPI-Host': 'instagram-post-and-reels-downloader.p.rapidapi.com'
    //     }
    //   };
      
      
      
    
      
          console.log(`downloading... ${url} ip : ${ip}`);
      
          
          try {

              // const response = await axios.request(options);
              const data = await igdl(url)
              console.log(data)
             // console.log(response.data);
              callback(true,data)
             // callback(true,response.data)
      
          } catch (error) {
              console.error(false,error);
          }
      


}



module.exports = instaDownload

