const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    matricule: { type: String, required: true, unique: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    situation: { type: String, default: 'agent', enum: ['agent', 'retired'] },
    date_n: { type: String },
    lieu_n: { type: String },
    genre: { type: String, enum: ['homme', 'femme'] },
    post: { type: String },
    residence: { type: String },
    numTel: {
        areaCode: { type: String },
        number: { type: String }

    },
    familyMembers: [{ type: mongoose.Types.ObjectId, ref: 'FamilyMembre' }]



})


module.exports = mongoose.model('Agent', userSchema)
