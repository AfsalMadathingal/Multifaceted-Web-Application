const express = require('express')
const router = express.Router()
const instaDownload = require('../utils/instaDownloader')



router.get('/', (req, res) => {

    try {
        res.render('homepage')
    }
    catch (error) {

        console.log(error)
    }
})

router.post('/download', (req, res) => {

try {

    console.log("this is download");

    console.log(req.body.url);

    const url = req.body.url

    instaDownload(url, (status,data) => {
        

        if(status){
            
            res.send({
                status:true,
                data:data
            })

        }else
        {
            res.send({
                status:false
            })
        }

    })
    
} catch (error) {
    
    res.send('Invalid URL')
    console.log(error);

}

   





})








module.exports = router