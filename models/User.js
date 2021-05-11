const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    matricule: { type: String },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    nom: { type: String },
    prenom: { type: String },
    nom: { type: String },
    role: { type: String, enum: ['admin', 'doctor', 'nurse'] },
})


module.exports = mongoose.model('User', userSchema)
