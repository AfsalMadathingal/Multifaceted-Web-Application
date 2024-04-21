const express = require('express')
const router = express.Router()
const financeCont = require('../controller/financeController')


router.get('/IPO-GMP-Latest-News',financeCont.scrapeIPOData)









module.exports = router