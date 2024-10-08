const cloudinary = require('../cludinary')
const express = require('express')
const router = express.Router()
const upload = require('../../middleware/upload')
const blog = require('../../model/blog')
const path = require('path')
const fs = require('fs').promises
const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid');
const adminlayout = {layout: 'admin/adminlayout'} 
const adminmodel = require('../../model/admin')
const bcrypt = require('bcrypt')
const saltRounds = 12