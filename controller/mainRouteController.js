const instaDownload = require('../utils/instaDownloader')
const pageData = require('../public/json/pagetitles.json')
const blog = require('../model/blog')
const { marked } = require('marked')
const nodemailer = require('nodemailer');
require('dotenv').config()



const downloader = async (req, res) => {

    try {

        const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
        console.log(`ip address: ${ipAddress}`);
        const blogData = await blog.find({})
        res.render('newhome',{
            blogData:blogData,
            title:pageData.homepagetitle,
            desc:pageData.downloaderDesc,
            keywords:pageData.commonKeys
        })
    }
    catch (error) {

        console.log(error)
    }
}


const instaDwn= async (req, res) => {

    try {
    
    
    
        console.log("this is download");
    
        console.log(req.body.url);
    
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
    
    
    }


const about = (req, res) => {

    try {
        
        console.log('/about');

        res.render('about',{
            title:"About Us - ILuvnet",
            desc:pageData.comondesc
        }) 
    }
    catch(error)
    {

        console.log(error);
    }


}


const contactus= (req, res) => {

    try {

        console.log('/contactus');
        
        res.render('contactus',{
            title:"Contact Us - ILuvnet",
            desc:pageData.comondesc
        })

    } catch (error) {
        
    }
    
}

const service = (req, res) => {
    
    try {
        
        console.log('/service');

        res.render('services',{
            title:"Services - ILuvnet",
            desc:pageData.comondesc
        })
    } catch (error) {
        
    }
}

const terms =  (req, res) => {
    
    try {
        
        console.log('/terms');

        res.render('termsofservice',{
            title:"termsofservice - ILuvnet",
            desc:pageData.comondesc
        })
    } catch (error) {
        
    }
}

const faq = (req, res) => {
    
    try {
        
        console.log('/FAQ');

        res.render('faqnew',{
            title:"FAQ - ILuvnet",
            desc:pageData.comondesc
        })
    } catch (error) {
        
    }
}

const policy = (req,res)=>{



    try {
        
        res.render('privacypolicy',{title:"Privacy Policy | ILuvnet",desc:pageData.comondesc})


    } catch (error) {

        console.log(error);
        
        res.send('  internal error Please go back home')
    }
}


const api = (req,res)=>{
    
    res.render('api',{title:"API | IMAGE TO PDF ",desc:pageData.comondesc })
}


const blogPage = async (req,res)=>{


    try
    {
        const blogData = await blog.find({}).sort({date:-1});
       const desc = encodeURIComponent(pageData.bloghomeDesc);
       const keywords = encodeURIComponent(pageData.bloghomeKeywords);
        res.render('blogtwo', {title:"Blogs | ILuvnet.com",desc:desc , blogData:blogData,keywords:keywords})

    }catch(err)
    {
        res.send("internal error Please go back home")
        console.log(err);
    }
}

const blogView  = async (req,res)=>{

try {
    const id = req.params.id;

    const blogdata = await blog.findOne({_id:id});
    const relatedBlog = await blog.find({}).limit(4);

    marked.setOptions({
        pedantic: false
      });
    const markdownContent = `${blogdata.description}`;
    const htmlContent = marked(markdownContent);
    
    
        res.render(
            'blogview',
            {
                title: "Blog | ILuvnet",
                desc: pageData.comondesc,
                blog: {
                    title: blogdata.title,
                    description: htmlContent,
                    image: blogdata.image,
                    date: blogdata.date,
                    shortDescription: blogdata.shortDescription,
                    tags: blogdata.tags,
                    _id: blogdata._id,
                    comments: blogdata.comments
                }
                ,
                relatedBlog: relatedBlog
            }
        );
} catch (error) {
    console.log(error);
    res.send("internal error Please go back home")
}
    

}

const landing  = (req,res)=>{

    const keywords = encodeURIComponent(pageData.commonKeys);
    const desc = encodeURIComponent(pageData.homepagedesc);

    res.render('landingpage',{
        title:pageData.homepagetitle,
        desc:desc,
        keywords:keywords
    })
}


const contactForm =  async (req, res) => {

    try {   
        const { name, email, message } = req.body;
       
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

 
  const mailOptions = {
    from: process.env.EMAIL,
    to: "contact.ilovenet@gmail.com",
    subject: 'New Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('An error occurred');
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('/');
    }
  });
        
    } catch (error) {
        
    }
}

const commentBlog = async (req, res) => {
    try {
        
        
        const { name, comment ,id } = req.body;
        console.log("id ", id);
        const date = new Date();
        const response = await blog.updateOne({
            _id: id
            
        },
        {
            $push: {comments: {name, comment , date:date}}
        })

        console.log(response);

        res.json({status:true, message:"comment added"})

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    downloader,
    instaDwn,
    about,
    contactus,
    service,
    terms,
    faq,
    policy,
    api,
    blogPage,
    blogView,
    landing,
    contactForm,
    commentBlog
}