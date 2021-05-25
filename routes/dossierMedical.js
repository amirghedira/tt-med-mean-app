const express = require('express')
const router = express.Router()
const cloudinary = require('../middleware/cloudinary')
const AuthGuard = require('../middleware/AuthGuard')
const {
    getDossierMedical, searchDossierMedical, updateDossierMedical, uploadDossierMedicalImage,
    uploadBiologyImage,
    addFicheMedical,
    AddAppointment,
    downloadOrdonnancePdf,
    downloadCertificatPresencePdf,
    downloadCertificatMedicalPdf,
    downloadCertificatMariagePdf,
    downloadCertificatAccompagnementPdf,
} = require('../controller/dossierMedical')


router.get('/:dossierId', AuthGuard, getDossierMedical)
router.get('/search/:matricule', AuthGuard, searchDossierMedical)
router.get('/ordannance/:ficheId/:appointmentId', AuthGuard, downloadOrdonnancePdf)
router.get('/certificat/mariage/:dossierId', AuthGuard, downloadCertificatMariagePdf)
router.get('/certificat/presence/:dossierId/:ficheId/:appointmentId', AuthGuard, downloadCertificatPresencePdf)
router.get('/certificat/medical/:dossierId/:ficheId/:appointmentId', AuthGuard, downloadCertificatMedicalPdf)
router.get('/certificat/accompagnement/:dossierId/:ficheId/:appointmentId', AuthGuard, downloadCertificatAccompagnementPdf)

router.post('/:dossierId/fiche-medicale', AuthGuard, addFicheMedical)
router.post('/fiche-medicale/:ficheId/appointment', AuthGuard, AddAppointment)

router.patch('/dossier-image/:dossierId', AuthGuard, cloudinary.parser.single('dossier-image'), uploadDossierMedicalImage)
router.patch('/biology-image/:dossierId', AuthGuard, cloudinary.parser.single('biology-image'), uploadBiologyImage)
router.patch('/:dossierId', AuthGuard, updateDossierMedical)




module.exports = router