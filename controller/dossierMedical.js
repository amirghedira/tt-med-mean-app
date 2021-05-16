const DossierMedical = require('../models/DossierMedical')



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
        await DossierMedical.updateOne({ _id: req.params.dossierId }, { $set: { ...req.body.dossierMedical } })
        res.status(200).json({ message: 'dossier medical updated' })
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}