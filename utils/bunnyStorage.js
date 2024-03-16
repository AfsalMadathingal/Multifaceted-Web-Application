const https = require('https');
const fs = require('fs');




const uploadFile = async (pdfToUpload) => {


    
const REGION = ''; 
const BASE_HOSTNAME = 'storage.bunnycdn.com';
const HOSTNAME = REGION ? `${REGION}.${BASE_HOSTNAME}` : BASE_HOSTNAME;
const STORAGE_ZONE_NAME = 'pdftoolsstorage';
const FILENAME_TO_UPLOAD = pdfToUpload;
const FILE_PATH = `./public/pdf/${FILENAME_TO_UPLOAD}`;
const ACCESS_KEY = 'c352072f-5a78-4d5b-867a580d3cfc-c439-4239';



  const readStream = fs.createReadStream(FILE_PATH);

  const options = {
    method: 'PUT',
    host: HOSTNAME,
    path: `/${STORAGE_ZONE_NAME}/${FILENAME_TO_UPLOAD}`,
    headers: {
      AccessKey: ACCESS_KEY,
      'Content-Type': 'application/octet-stream',
    },
  };

  const req = https.request(options, (res) => {
    res.on('data', (chunk) => {
      console.log(chunk.toString('utf8'));
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  readStream.pipe(req);
};


const main = async (pdfToUpload) => {

return  await uploadFile(pdfToUpload).then(() => {


  return `https://geetreels.b-cdn.net/${pdfToUpload}`

  }

  );
};

module.exports ={main } 



