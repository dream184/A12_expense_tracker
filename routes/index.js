const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const record = require('./modules/record')
const user = require('./modules/user')
const { authenticator } = require('../middleware/auth')

router.use('/users', user)
router.use('/records', authenticator, record)
router.use('/', authenticator, home)

module.exports = router
