const express = require('express')
const router = express.Router()
const { register,verifyToken, login, eventDetails, verifyJWT } = require('../controller/user.controller')

router.post('/register', register)
router.post('/login', login)
router.post('/verifyToken', verifyToken)
router.post('/eventDetails', eventDetails)
router.post('/jswtoken', verifyJWT)

module.exports = router