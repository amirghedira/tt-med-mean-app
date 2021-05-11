const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    qualite: { type: String, default: 'enfant', enum: ['enfant', 'conjoint'] },
    rang: { type: Number },
    lieu_n: { type: String },
    genre: { type: String, enum: ['homme', 'femme'] },
    date_n: { type: String },

})


module.exports = mongoose.model('User', userSchema)
