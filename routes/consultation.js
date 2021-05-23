const express = require('express')
const AuthGuard = require('../middleware/AuthGuard')
const router = express.Router()

const { addConsultation, getConsultations, deleteConsultations, getTodayConsultations, updateConsultationClickDate } = require('../controller/consultation')



router.post('/', AuthGuard, addConsultation)
router.get('/', AuthGuard, getConsultations)
router.get('/today', AuthGuard, getTodayConsultations)
router.patch('/delete', AuthGuard, deleteConsultations)
router.patch('/click-date/:consultationId', AuthGuard, updateConsultationClickDate)






module.exports = router