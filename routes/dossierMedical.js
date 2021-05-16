const express = require('express')
const router = express.Router()
const AuthGuard = require('../middleware/AuthGuard')
const {
    getDossierMedical, searchDossierMedical,
} = require('../controller/dossierMedical')


router.get('/', AuthGuard, getDossierMedical)
router.get('/search/:matricule', AuthGuard, searchDossierMedical)




module.exports = router