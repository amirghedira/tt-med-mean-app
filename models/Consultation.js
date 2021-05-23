const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({

    agent_matricule: { type: String },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    familyMember: { type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember' },
    date: { type: String },
    clickDate: { type: String }
})


module.exports = mongoose.model('Consultation', consultationSchema)
