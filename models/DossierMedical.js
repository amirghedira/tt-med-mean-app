const mongoose = require('mongoose');

const medicalFileSchema = new mongoose.Schema({
    agent_matricule: { type: String },
    type: { type: String, enum: ['agent', 'other'], default: 'agent' },
    familyMember: { type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember' },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    image: { type: String },
    anthropomètriques: {
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
    biologiques: {
        current: { type: String },
        history: [{ type: String }]
    },
    fiche_medical: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FicheMedical' }],
    maladieChronique: [{ type: String }]
})


module.exports = mongoose.model('DossierMedical', medicalFileSchema)
