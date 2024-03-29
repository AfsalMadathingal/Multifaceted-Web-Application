const { ttdl } = require('btch-downloader') 


async function tiktokDownload (url,ip,callback) {
    

      
          console.log(`tiktok downloading... ${url} ip : ${ip}`);
      
          
          try {

              const data = await ttdl(url)
              console.log(data)
        
              callback(true,data)
             
      
          } catch (error) {
                callback(false,error)
              console.error(false,error);
          }
      


}



module.exports = tiktokDownload