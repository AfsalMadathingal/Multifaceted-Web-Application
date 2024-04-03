const instaDownload = require('../utils/instaDownloader')
const pageData = require('../public/json/pagetitles.json')
const blog = require('../model/blog')
const { marked } = require('marked')
const nodemailer = require('nodemailer');
require('dotenv').config()
const he = require('he')



const downloader = async (req, res) => {

    try {

        const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
        console.log(`ip address: ${ipAddress}`);
        const blogData = await blog.find({}).sort({date:-1}).limit(12)
        res.render('newhome',{
            blogData:blogData,
            title:pageData.homepagetitle,
            desc:pageData.downloaderDesc,
            keywords:pageData.commonKeys,
            canonical:`https://iluvnet.com/downloader`
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
            desc:pageData.comondesc,
            canonical:`https://iluvnet.com/about`
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
            desc:pageData.comondesc,
            canonical:`https://iluvnet.com/contactus`
        })

    } catch (error) {
        
    }
    
}

const service = (req, res) => {
    
    try {
        
        console.log('/service');

        res.render('services',{
            title:"Services - ILuvnet",
            desc:pageData.comondesc,
            canonical:`https://iluvnet.com/services`
        })
    } catch (error) {
        
    }
}

const terms =  (req, res) => {
    
    try {
        
        console.log('/terms');

        res.render('termsofservice',{
            title:"termsofservice - ILuvnet",
            desc:pageData.comondesc,
            canonical:`https://iluvnet.com/terms-of-service`
        })
    } catch (error) {
        
    }
}

const faq = (req, res) => {
    
    try {
        
        console.log('/FAQ');

        res.render('faqnew',{
            title:"FAQ - ILuvnet",
            desc:pageData.comondesc,
            canonical:`https://iluvnet.com/FAQ`
        })
    } catch (error) {
        
    }
}

const policy = (req,res)=>{



    try {
        
        res.render('privacypolicy',{
            title:"Privacy Policy | ILuvnet",
            desc:pageData.comondesc,
            canonical:`https://iluvnet.com/policy`
        })


    } catch (error) {

        console.log(error);
        
        res.send('  internal error Please go back home')
    }
}


const api = (req,res)=>{
    
    res.render('api',{title:"API | IMAGE TO PDF ",desc:pageData.comondesc,canonical:`https://iluvnet.com/api`}) 
}



const blogPage = async (req, res) => {
    try {
        // Get the query parameters for pagination
        const { skip = 0, limit = 12 } = req.query;
        
        // Convert skip and limit to numbers
        const skipNum = parseInt(skip);
        const limitNum = parseInt(limit);

        // Fetch blog data based on skip and limit
        const blogData = await blog.find({}).sort({ date: -1 }).skip(skipNum).limit(limitNum);
        
        const arrayWithSkippedItems = blogData.slice(3);
        // If there's more data available, set a flag to indicate it
        const hasMoreData = (skipNum + limitNum) < (await blog.countDocuments());

        // Render the blog page with the fetched data and the hasMoreData flag
        res.render('blogtwo', {
            title: "Blogs | ILuvnet.com",
            desc: encodeURIComponent(pageData.bloghomeDesc),
            keywords: encodeURIComponent(pageData.bloghomeKeywords),
            blogData: blogData,
            arrayWithSkippedItems: arrayWithSkippedItems,
            hasMoreData: hasMoreData,
            canonical:`https://iluvnet.com/blog`
        });
    } catch (err) {
        res.send("Internal error. Please go back home.");
        console.log(err);
    }
};

const blogView  = async (req,res)=>{

try {
    const id = req.params.id;
    console.log(id);
    const indianDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    console.log(`Current date and time in Mumbai, India: ${indianDate}`);
    const query = id.replace(/-/g, ' ');
    const newchanged = query.replace(/@/g, '-').replace(/qmark/g, '?').replace(/percentage/g, '%');
    console.log(newchanged);
    const blogdata = await blog.findOneAndUpdate({title:newchanged},{$inc:{views:1}})
    const relatedBlog = await blog.find({ title: { $ne: newchanged } }).sort({ date: -1 }).limit(5);
 

    marked.setOptions({
        pedantic: false
      });
    const markdownContent = `${blogdata?.description}`;
    const htmlContent = marked(markdownContent);
   

        res.render(
            'blogview',
            {
                title: `${blogdata.title} | ILuvnet.com `,
                desc: blogdata.shortDescription,
                keywords: blogdata.tags,
                blog: {
                    title: blogdata.title,
                    description: htmlContent,
                    image: blogdata.image,
                    date: blogdata.date,
                    shortDescription: blogdata.shortDescription,
                    tags: blogdata.tags,
                    _id: blogdata._id,
                    comments: blogdata.comments,
                    views:blogdata.views
                }
                ,
                relatedBlog: relatedBlog,
                thumbnail: blogdata.image,
                canonical: `https://iluvnet.com/blogview/${id}`
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
        keywords:keywords,
        canonical:`https://iluvnet.com/`
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

        if (name.trim() === "" || comment.trim() === "" || name.trim().length > 50 || comment.trim().length > 150) {
            res.json({status:false, message:"Name and Comment must not be empty!"})
            return;
        }
        
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
        res.json({status:false, message:"comment not added"})

    }
}

const sitemap = async (req, res) => {
    
    try {

        const blogData = await blog.find({});

        res.render('sitemap', {
            blogData: blogData,
            canonical:`https://iluvnet.com/sitemap`
        })

        
    } catch (error) {
        

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
    commentBlog,
    sitemap
}