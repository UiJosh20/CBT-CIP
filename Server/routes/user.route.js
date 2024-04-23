const express = require('express')
const router = express.Router()
const { register,verifyToken, login, eventDetails, verifyJWT, confirmEventDetails } = require('../controller/user.controller')

router.post('/register', register)
router.post('/login', login)
router.post('/verifyToken', verifyToken)
router.post('/eventDetails', eventDetails)
router.post('/jswtoken', verifyJWT)
router.post('/confirmEventDetails', confirmEventDetails)

module.exports = router