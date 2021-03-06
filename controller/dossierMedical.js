const DossierMedical = require('../models/DossierMedical')
const FicheMedical = require('../models/FicheMedical')
const pdf = require('html-pdf')
const User = require('../models/User')
const moment = require('moment')
const ordannancePdfTemplate = require('../pdfs/ordonnance')
const certifMariagePdfTemplate = require('../pdfs/certificatDeMariage')
const certifAccompPdfTemplate = require('../pdfs/certificatAccompagnement')
const certifPresencePdfTemplate = require('../pdfs/certificatDePresence')
const certifMedicalPdfTemplate = require('../pdfs/certificatMedical')

exports.downloadOrdonnancePdf = async (req, res) => {
    try {
        const ficheMedical = await FicheMedical.findOne({ _id: req.params.ficheId })
        if (!ficheMedical)
            return res.status(400).json({ message: 'doctor or document not found' })
        const appointmentIndex = ficheMedical.appointments.findIndex((ap => ap._id.toString() == req.params.appointmentId))
        const appointment = ficheMedical.appointments[appointmentIndex]
        pdf.create(ordannancePdfTemplate(
            {
                date: moment(new Date(appointment.date)).format('DD-MM-YYYY')
            }, {})).toBuffer((err, buffer) => {
                if (err) {
                    res.send(Promise.reject());
                }
                res.status(200).json({ blob: buffer.toString("base64") })
            });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })

    }
}

exports.downloadCertificatMariagePdf = async (req, res) => {
    try {
        const doctor = await User.findOne({ _id: req.user._id, role: 'doctor' })
        const dossierMedical = await DossierMedical.findOne({ _id: req.params.dossierId })
            .populate('agent')
            .populate('familyMember')
        const patient = dossierMedical.agent ? dossierMedical.agent : dossierMedical.familyMember
        pdf.create(certifMariagePdfTemplate(
            {
                doctorNom: doctor.nom,
                doctorPrenom: doctor.prenom,
                patientNom: patient.nom,
                patientPrenom: patient.prenom,
                patientLieu: patient.lieu_n,
                patientDate_n: patient.date_n
            }, {})).toBuffer((err, buffer) => {
                if (err) {
                    res.send(Promise.reject());
                }
                res.status(200).json({ blob: buffer.toString("base64") })
            });
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

exports.downloadCertificatPresencePdf = async (req, res) => {
    try {
        try {
            const doctor = await User.findOne({ _id: req.user._id, role: 'doctor' })
            const dossierMedical = await DossierMedical.findOne({ _id: req.params.dossierId })
                .populate('agent')
                .populate('familyMember')
            if (!doctor || !dossierMedical)
                return res.status(400).json({ message: 'doctor or document not found' })
            const patient = dossierMedical.agent ? dossierMedical.agent : dossierMedical.familyMember
            const ficheMedical = await FicheMedical.findOne({ _id: req.params.ficheId })
            if (!ficheMedical)
                return res.status(400).json({ message: 'fiche medical not found' })
            const appointmentIndex = ficheMedical.appointments.findIndex((ap => ap._id.toString() == req.params.appointmentId))
            const appointment = ficheMedical.appointments[appointmentIndex]
            pdf.create(certifPresencePdfTemplate(
                {
                    appointmentDate: moment(new Date(appointment.date)).format('DD-MM-YYYY'),
                    doctorNom: doctor.nom,
                    doctorPrenom: doctor.prenom,
                    patientNom: patient.nom,
                    patientPrenom: patient.prenom,
                }, {})).toBuffer((err, buffer) => {
                    if (err) {
                        res.send(Promise.reject());
                    }
                    res.status(200).json({ blob: buffer.toString("base64") })
                });
        } catch (error) {
            res.status(500).json({ error: error.message })

        }
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

exports.downloadCertificatMedicalPdf = async (req, res) => {
    try {
        const doctor = await User.findOne({ _id: req.user._id, role: 'doctor' })
        const dossierMedical = await DossierMedical.findOne({ _id: req.params.dossierId })
            .populate('agent')
            .populate('familyMember')
        if (!doctor || !dossierMedical)
            return res.status(400).json({ message: 'doctor or document not found' })

        const patient = dossierMedical.agent ? dossierMedical.agent : dossierMedical.familyMember
        const ficheMedical = await FicheMedical.findOne({ _id: req.params.ficheId })
        if (!ficheMedical)
            return res.status(400).json({ message: 'fiche medical not found' })
        const appointmentIndex = ficheMedical.appointments.findIndex((ap => ap._id.toString() == req.params.appointmentId))
        const appointment = ficheMedical.appointments[appointmentIndex]
        pdf.create(certifMedicalPdfTemplate(
            {
                appointmentDate: moment(new Date(appointment.date)).format('DD-MM-YYYY'),
                doctorNom: doctor.nom,
                doctorPrenom: doctor.prenom,
                patientNom: patient.nom,
                patientPrenom: patient.prenom,
            }, {})).toBuffer((err, buffer) => {
                if (err) {
                    res.send(Promise.reject());
                }
                res.status(200).json({ blob: buffer.toString("base64") })
            });
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}
exports.downloadCertificatAccompagnementPdf = async (req, res) => {
    try {
        const doctor = await User.findOne({ _id: req.user._id, role: 'doctor' })
        const dossierMedical = await DossierMedical.findOne({ _id: req.params.dossierId })
            .populate('agent')
            .populate('familyMember')
        if (!doctor || !dossierMedical)
            return res.status(400).json({ message: 'doctor or document not found' })

        const patient = dossierMedical.agent ? dossierMedical.agent : dossierMedical.familyMember
        const ficheMedical = await FicheMedical.findOne({ _id: req.params.ficheId })
        if (!ficheMedical)
            return res.status(400).json({ message: 'fiche medical not found' })
        const appointmentIndex = ficheMedical.appointments.findIndex((ap => ap._id.toString() == req.params.appointmentId))
        const appointment = ficheMedical.appointments[appointmentIndex]
        pdf.create(certifAccompPdfTemplate(
            {
                appointmentDate: moment(new Date(appointment.date)).format('DD-MM-YYYY'),
                doctorNom: doctor.nom,
                doctorPrenom: doctor.prenom,
                patientNom: patient.nom,
                patientPrenom: patient.prenom,
            }, {})).toBuffer((err, buffer) => {
                if (err) {
                    res.send(Promise.reject());
                }
                res.status(200).json({ blob: buffer.toString("base64") })
            });
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}
exports.searchDossierMedical = async (req, res) => {
    try {
        let dossierMedicals = await DossierMedical.find({ agent_matricule: req.params.matricule })
            .populate('agent')
            .populate('familyMember')
            .exec()
        const { type, rang } = req.query
        dossierMedicals = dossierMedicals.filter(dossierMedical => {
            if (type == 'agent') {
                return dossierMedical.type == 'agent'
            } else if (type == 'conjoint') {
                if (dossierMedical.type == 'other')
                    return dossierMedical.familyMember.qualite == 'conjoint'
            } else {
                if (dossierMedical.type == 'other')
                    return (dossierMedical.familyMember.qualite == 'enfant' && dossierMedical.familyMember.rang == rang)
            }

        })
        if (dossierMedicals.length == 1) {
            res.status(200).json({ dossierMedical: dossierMedicals[0] })
        } else {
            res.status(404).json({ message: 'dossier medical not found' })

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}
exports.getDossierMedical = async (req, res) => {
    try {
        const dossierMedical = await DossierMedical.findOne({ _id: req.params.dossierId })
            .populate('agent')
            .populate('familyMember')
            .populate('fiche_medical_chronique')
            .populate('fiche_medical_ordinaire')
            .exec()
        if (dossierMedical)
            res.status(200).json({ dossierMedical: dossierMedical })
        else
            res.status(404).json({ message: 'dossier medical not found' })


    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}
exports.uploadDossierMedicalImage = async (req, res) => {
    try {
        await DossierMedical.updateOne({ _id: req.params.dossierId }, { $set: { image: req.file.secure_url } })

        res.status(200).json({ newImage: req.file.secure_url })

    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}
exports.uploadBiologyImage = async (req, res) => {
    try {
        const dossierMedical = await DossierMedical.findOne({ _id: req.params.dossierId })
        if (dossierMedical.biologiques.current)
            dossierMedical.biologiques.history.push(dossierMedical.biologiques.current)
        dossierMedical.biologiques.current = req.file.secure_url
        await dossierMedical.save()
        res.status(200).json({ newImage: req.file.secure_url })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })

    }
}
exports.updateDossierMedical = async (req, res) => {
    try {
        const dossierMedical = await DossierMedical.findOne({ _id: req.params.dossierId })
        const newAnthropometriques_history = [...dossierMedical.anthropometriques_history, { ...dossierMedical.anthropometriques, date: new Date().toISOString() }]
        await DossierMedical.updateOne({ _id: req.params.dossierId }, { $set: { ...req.body.dossierMedical, anthropometriques_history: newAnthropometriques_history } })
        res.status(200).json({ message: 'dossier medical updated' })
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}


exports.addFicheMedical = async (req, res) => {
    try {
        const createdFicheMedical = await FicheMedical.create(req.body.ficheMedical)
        await DossierMedical.updateOne({ _id: req.params.dossierId }, { $push: { fiche_medical_chronique: createdFicheMedical._id } })
        res.status(200).json({ ficheMedical: createdFicheMedical })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })

    }
}

exports.AddAppointment = async (req, res) => {
    try {
        const newAppointment = {
            observation: req.body.appointment.observation,
            prescription: req.body.appointment.prescription,
            haveOrdonnance: req.body.appointment.haveOrdonnance,
            certificat: req.body.appointment.certificat,
            date: new Date().toISOString()
        }
        await FicheMedical.updateOne({ _id: req.params.ficheId }, { $push: { appointments: newAppointment } })
        res.status(200).json({ message: 'rendez vous ajouter' })
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}