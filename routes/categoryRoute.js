const express = require('express')
const router = express.Router()
const blogCont = require('../controller/blogController')


router.get('/tech',blogCont.tech)
router.get('/finance',blogCont.finance)
router.get('/gadgets-reviews',blogCont.gadgets)
router.get('/movies',blogCont.movies)
router.get('/news',blogCont.news)
router.get('/life-style',blogCont.lifeStyle)






module.exports = router