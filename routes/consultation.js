const express = require('express')
const AuthGuard = require('../middleware/AuthGuard')
const router = express.Router()

const { addConsultation, getConsultations, deleteConsultations } = require('../controller/consultation')



router.post('/', AuthGuard, addConsultation)
router.get('/', AuthGuard, getConsultations)
router.patch('/delete', AuthGuard, deleteConsultations)





module.exports = router