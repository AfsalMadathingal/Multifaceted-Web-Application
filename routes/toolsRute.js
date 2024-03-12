const express = require('express')
const router = express.Router()
const {uploadSingle} = require('../middleware/upload');
const {converterFunction} = require('../utils/imageToPdf');
const { v4: uuidv4 } = require('uuid');

router.get('/imagetopdf',(req, res) => {
    
   

    res.render('imagetoPdf',{
        
    })
})


router.post('/imagetopdf', uploadSingle, async (req, res) => {

    
    console.log(req.files);

    const {filename }= req.files[0];
    const pngOutputName = uuidv4() + '.png';
    
   const response = await  converterFunction(`./public/uploads/${filename}`,`./public/uploads/${pngOutputName}`)
    console.log("path ",response);
 
    try {
        fs.unlinkSync(response.imagePath); // Remove PDF file
        fs.unlinkSync(filename)
    } catch (error) {
        
console.log(error);
    }
   
    res.json(response)


    
    
    
})


module.exports = router