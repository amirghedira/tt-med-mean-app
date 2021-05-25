const mongoose = require('mongoose');

const ficheMedicalSchema = new mongoose.Schema({

    maladie: { type: String },
    type: { type: String, enum: ['ordinaire', 'chronique'], default: 'chronique' },
    appointments: [{
        date: { type: String },
        observation: { type: String },
        prescription: { type: String },
        haveOrdonnance: { type: Boolean, default: false },
        certificat: { type: String, enum: ['medical', 'accompagnement', 'presence', 'ordonnance', 'mariage'] }
    }]
})


module.exports = mongoose.model('FicheMedical', ficheMedicalSchema)
