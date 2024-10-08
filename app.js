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
const { v4: uuidv4 } = require('uuid');
const he = require('he')



mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected')
})

cleanup();
setInterval(cleanup, 30 * 60 * 1000);


app.use(session({
    secret: uuidv4(),
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
hbs.registerHelper('changeSpacesToDash', function(str) {
    return str.replace(/-/g, '@').replace(/\s/g, '-').replace(/\?/g, 'qmark').replace(/%/g, 'percentage')
});

hbs.registerHelper('skipThree', function(array) {
  return array.slice(3);
});
hbs.registerHelper('he', function(desc) {
    return he.decode(desc)
})



const downRoute = require('./routes/downloaderRoute')
const rssRoute = require('./routes/rssFeed')
const category = require('./routes/categoryRoute')
const api = require('./routes/api/randomq')
const finance = require('./routes/financeRoute')
app.use('/finance',finance)
app.use('/blog/category',category)
app.use('/rss', rssRoute);
app.use('/', mainRoute)
app.use('/tools',toolsRoute)
app.use('/admin',adminRoute)
app.use('/downloader',downRoute)
app.use('/api',api)

app.use((req, res, next) => {
    res.status(404).render('error', { title: 'Page Not Found' });
});




app.listen(PORT, () => {

    console.log(`Server is running on port http://localhost:${PORT}`)
})
