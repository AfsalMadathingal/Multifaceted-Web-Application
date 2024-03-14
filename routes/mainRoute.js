const express = require('express')
const router = express.Router()
const instaDownload = require('../utils/instaDownloader')
const pageData = require('../public/json/pagetitles.json')


router.get('/', (req, res) => {

    try {

        const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
        
        console.log(`ip address: ${ipAddress}`);

        res.render('homepage',{
            title:pageData.homepagetitle,
            desc:pageData.homepagedesc,
            keywords:pageData.homeKeywords
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

    const ip = ipAddress.split(',')

    if (ip[0] == '154.160.11.4')
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
        
        console.log('/about');

        res.render('about',{
            title:"About Us - Getreels",
            desc:pageData.comondesc
        }) 
    }
    catch
    {

    }


})

router.get('/contactus', (req, res) => {

    try {

        console.log('/contactus');
        
        res.render('contactus',{
            title:"Contact Us - Getreels",
            desc:pageData.comondesc
        })

    } catch (error) {
        
    }
    
})


router.get('/services', (req, res) => {
    
    try {
        
        console.log('/service');

        res.render('services',{
            title:"Services - Getreels",
            desc:pageData.comondesc
        })
    } catch (error) {
        
    }
})


router.get('/policy',(req,res)=>{



    try {
        
        res.render('privacypolicy',{title:"Privacy Policy | GetReels",desc:pageData.comondesc})


    } catch (error) {

        console.log(error);
        
        res.send('  internal error Please go back home')
    }
})







module.exports = router