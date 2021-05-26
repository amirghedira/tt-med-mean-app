const mongoose = require('mongoose');
const FicheMedical = require('./FicheMedical')
const DossierMedicalSchema = new mongoose.Schema({
    agent_matricule: { type: String },
    type: { type: String, enum: ['agent', 'other'], default: 'agent' },
    familyMember: { type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember' },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    image: { type: String },
    haveElectrocardiogramme: { type: Boolean, default: false },
    anthropometriques: {
        poid: { type: String, default: '' },
        taille: { type: String, default: '' },
        vision_pre_droite: { type: String, default: '' },
        vision_pre_gauche: { type: String, default: '' },
        vision_loin_droite: { type: String, default: '' },
        vision_loin_gauche: { type: String, default: '' },
        audition_oreille_gauche: { type: String, default: '' },
        audition_oreille_droite: { type: String, default: '' },
        puls: { type: String, default: '' },
        tension: { type: String, default: '' }
    },
    anthropometriques_history: [{
        date: { type: String },
        poid: { type: String, default: '' },
        taille: { type: String, default: '' },
        vision_pre_droite: { type: String, default: '' },
        vision_pre_gauche: { type: String, default: '' },
        vision_loin_droite: { type: String, default: '' },
        vision_loin_gauche: { type: String, default: '' },
        audition_oreille_gauche: { type: String, default: '' },
        audition_oreille_droite: { type: String, default: '' },
        puls: { type: String, default: '' },
        tension: { type: String, default: '' }
    }],
    biologiques: {
        current: { type: String },
        history: [{ type: String }]
    },
    fiche_medical_ordinaire: { type: mongoose.Schema.Types.ObjectId, ref: 'FicheMedical' },
    fiche_medical_chronique: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FicheMedical' }],
})

DossierMedicalSchema.pre('save', function (next) {
    const newFicheMedical = new FicheMedical({
        type: 'ordinaire'
    })
    newFicheMedical.save()
        .then(createdFicheMedicalOrdinaire => {
            this.fiche_medical_ordinaire = createdFicheMedicalOrdinaire._id
            next()
        })

});
module.exports = mongoose.model('DossierMedical', DossierMedicalSchema)
