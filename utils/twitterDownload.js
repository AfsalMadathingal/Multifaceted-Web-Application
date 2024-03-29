const { twitter  } = require('btch-downloader') 


async function twitterDownload (url,ip,callback) {
    

      
          console.log(`downloading... ${url} ip : ${ip}`);
      
          
          try {

              // const response = await axios.request(options);
              const data = await twitter (url)
              console.log(data)
             // console.log(response.data);
              callback(true,data)
             // callback(true,response.data)
      
          } catch (error) {
              console.error(false,error);
          }
      


}



module.exports = twitterDownload