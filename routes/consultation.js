const express = require('express')
const router = express.Router()

const { addConsultation, getConsultations } = require('../controller/consultation')



router.post('/', addConsultation)
router.get('/', getConsultations)






module.exports = router