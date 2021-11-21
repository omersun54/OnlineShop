
const express = require('express');

const router = express.Router()

const authControllers = require('../controllers/authcontrollers')




router.get('/',authControllers.login_get)

router.post('/', authControllers.login_post)


router.get('/logout',authControllers.log_out)

module.exports =router