const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    matricule: { type: String, required: true, unique: true },
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
    familyMembers: [{
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        qualite: { type: String, default: 'enfant', enum: ['enfant', 'conjoint'] },
        rang: { type: Number },
        lieu_n: { type: String },
        genre: { type: String, enum: ['homme', 'femme'] },
        date_n: { type: String }
    }]



})


module.exports = mongoose.model('Agent', userSchema)
