const cloudinary = require('../../utils/clodinary')
const express = require('express')
const router = express.Router()
const upload = require('../../middleware/upload')
const blog = require('../../model/blog')
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid');
const adminlayout = {layout: 'admin/adminlayout'} 
const adminmodel = require('../../model/admin')
const bcrypt = require('bcrypt')
const saltRounds = 12
const auth = require('../../middleware/auth')

router.get('/',auth.isLogin,(req,res)=>{

    res.redirect('/admin/dashboard')

})

router.get('/dashboard',auth.isLogin,(req,res)=>{

    res.render('admin/dashboard',{
        layout: 'admin/adminlayout'
    })
})


router.get('/login',auth.isLogout,(req,res)=>{

    res.render('admin/login',adminlayout)

})

router.post('/login', async (req, res) => {

    try {
 
        const { username, password } = req.body;

        if (!username || !password) {

            return res.status(400).json("All fields are required");

        }

        const admin = await adminmodel.find({ username });

        if (!admin) return res.status(400).json("Admin not found");

         bcrypt.compare(password, admin[0].password, function (err, result) {

            if (err) {

                return res.status(400).json("Password not match");
            }

            if (result) {

                req.session.admin = admin;
                res.json({status:true , message:"Login successfull"});
            }

        })


    } catch (error) {

        res.send("internal error Please go back home")
    }

   

})


router.get('/write-blog',auth.isLogin,(req,res)=>{
    
    res.render('admin/blogManage',{
        layout: 'admin/adminlayout'
    })

})

router.post('/blog-submit', upload.uploadSingle, async (req, res) => {
    try {
        const { title, Description, Content , tags } = req.body;
        const { filename } = req.files[0];
        console.log(req.body);
    
        const newfilename = uuidv4()
        const tempImagePath = path.resolve() + `/public/uploads/${filename}`;
        const outImagePath = path.resolve() + `/public/uploads/${newfilename}.webp`;

        await sharp(req.files[0].path)
            .resize(800, 600, { fit: 'inside' }) 
            .webp({ quality: 100 }) 
            .toFile(outImagePath);

        const uploadedImage = await cloudinary.uploader.upload(outImagePath, {
            folder: 'your_folder_name',
            use_filename: true
        });

        const tagsArray= tags.split(',')

        const newBlog = new blog({
            title,
            description: Content,
            image: uploadedImage.url,
            shortDescription: Description,
            tags: tagsArray
        });

        newBlog.save();

        fs.unlink(tempImagePath, (err) => {
            if (err) console.error(err)
        });

         fs.unlink(outImagePath, (err) => {
            if (err) console.error(err)
        });
        
        console.log(uploadedImage.url);

       

        

        res.json("blog submitted");

    } catch (error) {
        console.log(error);
    }
});

router.get('/logout',auth.isLogin,(req,res)=>{
try {
    req.session.destroy();
    res.redirect('/admin/login')
} catch (error) {
    res.send("internal error Please go back home")
}

})





module.exports = router