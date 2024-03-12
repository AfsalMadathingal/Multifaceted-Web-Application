const express = require('express')
const router = express.Router()
const instaDownload = require('../utils/instaDownloader')



router.get('/', (req, res) => {

    try {

        const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
        
        console.log(`ip address: ${ipAddress}`);

        res.render('homepage',{
            title:"GetReels - Download Instagram Videos Easily"
        })
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

    const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

    if (ipAddress == '154.160.11.4')
    {
        res.send({
            status:false
        })

        console.log("if worked and blocked");
    }

    instaDownload(url,ipAddress, (status,data) => {
        

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


router.get('/about', (req, res) => {

    try {
        

        res.render('about',{
            title:"About Us - Getreels"
        }) 
    }
    catch
    {

    }


})

router.get('/contactus', (req, res) => {

    try {
        
        res.render('contactus',{
            title:"Contact Us - Getreels"
        })

    } catch (error) {
        
    }
    
})

router.get('/services', (req, res) => {
    
    try {
        
        res.render('services',{
            title:"Services - Getreels"
        })
    } catch (error) {
        
    }
})








module.exports = router