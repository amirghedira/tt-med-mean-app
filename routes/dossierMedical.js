const express = require('express')
const router = express.Router()

const {
    getDossierMedical,
} = require('../controller/dossierMedical')



router.get('/:matricule', getDossierMedical)




module.exports = router