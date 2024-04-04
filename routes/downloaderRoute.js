const express = require('express')
const router = express()
const axios = require('axios')
const { fbdown  } = require('btch-downloader') 
const { ttdl } = require('btch-downloader') 
const {twitter} = require('btch-downloader')
const instaDownload = require('../utils/instaDownloader')
const pageData = require('../public/json/pagetitles.json')
const he = require('he')

router.get('/facebook-video-downloader', (req, res) => {

    try {
        const desc = encodeURIComponent(pageData.facebookdesc);
        const str = desc.toString()
        res.render('downloaderViews/facebookDownloader',{title:"Facebook Video Downloader - ILuvnet",desc:desc , keywords: pageData.facebook})

    } catch (error) {
        
        res.send("internal error Please go back home")
    }
    
   
})


router.post('/facebook-download', async (req, res) => {

    try {

    
        console.log(req.body.url);
        const url = req.body.url
        const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
        const ip = ipAddress.split(',')
        console.log("facebook download",ip);
        let data

        try{
            data = await fbdown (url)

        }catch
        {
            return res.status(400).json({ status: false, error: 'Invalid URL or video data not found' });
        }
    
        console.log("data",data);

        if (!data || !data.HD) {
            console.error('Invalid URL or video data not found');
            return res.status(400).json({ status: false, error: 'Invalid URL or video data not found' });
        }

        const response = await axios.get(data.HD, { responseType: 'stream' });
        res.setHeader('Content-Disposition', 'attachment; filename=video.mp4');
        res.setHeader('Content-Type', response.headers['content-type']);
        response.data.pipe(res);
    


        
    } catch (error) {
        
        res.json({success:false,ok:false})

      
    
    }

})


router.get('/instagram-video-downloader', (req, res) => {
    try {
        

        const desc = pageData.instadesc;
        const keywords = pageData.instagram;
        res.render('downloaderViews/instagramDownloader',{
            title:pageData.homepagetitle,
            desc:desc,
            keywords:keywords
        })
    } catch (error) {
        

    }
})


router.post('/instagram-download', async (req, res) =>{

    try {
        console.log("this is insta download");
        const url = req.body.url
        const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
        const ip = ipAddress.split(',')
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


router.get('/tiktok-video-downloader', (req, res) => {

    try {

        const desc = pageData.tiktokdesc;
        const keywords = pageData.tiktok;
        res.render('downloaderViews/tiktokDownloader',{
            title:"Tiktok Video Downloader - ILuvnet",
            desc:desc,
            keywords:keywords
        })
        
    } catch (error) {
        

    }
})

router.post('/tiktok-download',async (req, res) => {

    try {

        const url = req.body.url
        let data
    
      try {
        
        data =  await ttdl(url)
        console.log(data);

      } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, error: 'Invalid URL or video data not found' });
        
      }

      if (!data || !data.video[0]) {
        console.error('Invalid URL or video data not found');
        return res.status(400).json({ status: false, error: 'Invalid URL or video data not found' });
    }

    const vd= data.video[0]

    const response = await axios.get(vd, { responseType: 'stream' });


    res.setHeader('Content-Disposition', 'attachment; filename=video.mp4');
    res.setHeader('Content-Type', response.headers['content-type']);

    response.data.pipe(res);
       

    } catch (error) {

        console.log(error);
        res.json({success:false,ok:false})

        
    }
})

router.post("/twitter-download", async (req, res) => {

  try {
    const url = req.body.url;
    let data;
    try {
      data = await twitter(url);
      

    } catch (error) {

        console.log(error);
    }



    if (!data || !data.url[0].hd) {
        console.error('Invalid URL or video data not found');
        return res.status(400).json({ status: false, error: 'Invalid URL or video data not found' });
    }

    const vd= data.url[0].hd

    const response = await axios.get(vd, { responseType: 'stream' });


    res.setHeader('Content-Disposition', 'attachment; filename=video.mp4');
    res.setHeader('Content-Type', response.headers['content-type']);

    response.data.pipe(res);


  } catch (error) {

    console.log(error);
    return res.status(400).json({ status: false, error: 'Invalid URL or video data not found' });
  }

});


router.get('/twitter-video-downloader', async(req,res)=>{

    try {
        
        const desc = encodeURIComponent(pageData.twitterdesc);
        const keywords = encodeURIComponent(pageData.twitter);
        res.render('downloaderViews/twitterDownloader',{
            title:"Twitter Video Downloader - ILuvnet",
            desc:desc,
            keywords:keywords
        })
        
    } catch (error) {
        console.log(error);
    }
})






module.exports = router