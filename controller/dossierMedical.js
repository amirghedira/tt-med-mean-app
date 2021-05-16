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
            console.log(dossierMedicals)
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