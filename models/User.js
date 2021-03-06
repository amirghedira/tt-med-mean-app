const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    matricule: { type: String },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    nom: { type: String },
    prenom: { type: String },
    numTel: { type: String },
    role: { type: String, enum: ['admin', 'doctor', 'nurse'] },
    workingHours: [{ type: String }],
})


module.exports = mongoose.model('User', userSchema)
