const mongoose = require('mongoose');

const ficheMedicalSchema = new mongoose.Schema({

    date: { type: String },
    Observation: { type: String },
    Prescription: { type: String },
    Certificat: { type: String, enum: ['medical', 'execptionnel', 'accompagnement', 'lettre de laison', 'ordonnance'] }
})


module.exports = mongoose.model('FicheMedical', ficheMedicalSchema)
