const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload');

router.get('/imagetopdf',(req, res) => {
    
   

    res.render('imageToPdf',{
        
    })
})


router.post('/imagetopdf', upload, (req, res) => {

    console.log(req.file);
    console.log(req.files);

    res.send('file uploaded')
    
})


module.exports = router