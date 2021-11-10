const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const record = require('./modules/record')
router.use('/', home)
router.use('/records', record)

module.exports = router
