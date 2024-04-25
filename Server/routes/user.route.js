const express = require('express')
const router = express.Router()
const { register,verifyToken, login, eventDetails, verifyJWT, getAllEvents} = require('../controller/user.controller')

router.post('/register', register)
router.post('/login', login)
router.post('/verifyToken', verifyToken)
router.post('/eventDetails', eventDetails)
router.post('/jswtoken', verifyJWT)
router.get('/getAllEvents', getAllEvents)


module.exports = router