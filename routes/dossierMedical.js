const express = require('express')
const router = express.Router()
const cloudinary = require('../middleware/cloudinary')
const AuthGuard = require('../middleware/AuthGuard')
const {
    getDossierMedical, searchDossierMedical, updateDossierMedical, uploadDossierMedicalImage,
    uploadBiologyImage,
    addFicheMedical,
    AddAppointment,
} = require('../controller/dossierMedical')


router.get('/:dossierId', AuthGuard, getDossierMedical)
router.get('/search/:matricule', AuthGuard, searchDossierMedical)

router.post('/:dossierId/fiche-medicale', AuthGuard, addFicheMedical)
router.post('/fiche-medicale/:ficheId/appointment', AuthGuard, AddAppointment)

router.patch('/dossier-image/:dossierId', AuthGuard, cloudinary.parser.single('dossier-image'), uploadDossierMedicalImage)
router.patch('/biology-image/:dossierId', AuthGuard, cloudinary.parser.single('biology-image'), uploadBiologyImage)
router.patch('/:dossierId', AuthGuard, updateDossierMedical)




module.exports = router