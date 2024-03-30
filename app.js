const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
require('dotenv').config()
const mainRoute = require('./routes/mainRoute')
const toolsRoute = require('./routes/toolsRute')
const session = require('express-session')
const cleanup = require('./utils/filescleanup')
const PORT = process.env.PORT || 3323
const adminRoute = require('./routes/adminRoute/adminRoute')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected')
})
cleanup();
setInterval(cleanup, 30 * 60 * 1000);


app.use(session({
    secret: '39472398shdjfjkh398475dhsf',
    resave: false,
    saveUninitialized: true,
}))

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    next();
});


app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerHelper('formatDate', function(isoDate) {
    const date = new Date(isoDate);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  });



const downRoute = require('./routes/downloaderRoute')
const rssRoute = require('./routes/rssFeed')

app.use('/', rssRoute);
app.use('/', mainRoute)
app.use('/tools',toolsRoute)
app.use('/admin',adminRoute)
app.use('/downloader',downRoute)









app.listen(PORT, () => {

    console.log(`Server is running on port http://localhost:${PORT}`)
})
