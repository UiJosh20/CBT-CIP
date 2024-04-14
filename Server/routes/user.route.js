const express = require('express')
const router = express.Router()
const { register,verifyToken, login } = require('../controller/user.controller')

router.post('/register', register)
router.post('/login', login)
router.post('/verifyToken', verifyToken)

module.exports = router