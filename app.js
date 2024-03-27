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

app.use((req, res, next) => {
  const clientIP = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(`Client IP: ${clientIP}`);
  next();
});


app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
hbs.registerPartials(path.join(__dirname, 'views/partials'));





app.use('/', mainRoute)
app.use('/tools',toolsRoute)









app.listen(PORT, () => {

    console.log(`Server is running on port http://localhost:${PORT}`)
})
