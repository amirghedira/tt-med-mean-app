const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    matricule: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    situation: { type: String, default: 'active', enum: ['active', 'retired'] },
    date_n: { type: String },
    lieu_n: { type: String },
    genre: { type: String, enum: ['homme', 'femme'] },
    poste: { type: String },
    residence: { type: String },
    recrutement_date: { type: String },
    numTel: { type: String },
    familyMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember' }]



})


module.exports = mongoose.model('Agent', userSchema)
