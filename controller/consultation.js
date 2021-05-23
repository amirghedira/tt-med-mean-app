const Consultation = require('../models/Consultation')
const Agent = require('../models/Agent')
const moment = require('moment')
exports.getConsultations = async (req, res) => {

    try {
        const consultations = await Consultation.find()
            .populate('agent')
            .populate('familyMember')
            .exec()
        res.status(200).json({ consultations: consultations })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

exports.updateConsultationClickDate = async (req, res) => {
    try {
        await Consultation.updateOne({ _id: req.params.consultationId }, { $set: { clickDate: (new Date()).toISOString() } })
        res.status(200).json({ message: 'click date successfully updated' })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
exports.getTodayConsultations = async (req, res) => {

    try {
        const consultations = await Consultation.find()
            .populate('agent')
            .populate('familyMember')
            .exec()
        let todayConsultations = consultations.filter(consultation => {
            return moment(new Date(consultation.date)).isSame(moment(new Date()), 'day')
        })

        todayConsultations = todayConsultations.sort((c1, c2) => {
            return (
                new Date(c1.clickDate).getTime() - new Date(c2.clickDate).getTime()
            );
        });
        res.status(200).json({ consultations: todayConsultations })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
exports.deleteConsultations = async (req, res) => {
    try {
        await Consultation.deleteMany({ _id: { $in: req.body.consultations } })
        res.status(200).json({ message: 'consultations successfully deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
exports.addConsultation = async (req, res) => {
    try {

        const agent = await Agent.findOne({ matricule: req.body.matricule })
        if (agent) {
            const { type } = req.query
            let newConsultation;
            if (type === 'agent') {

                newConsultation = new Consultation({
                    agent_matricule: req.body.matricule,
                    agent: req.body.destination,
                    date: (new Date()).toISOString(),
                    clickDate: (new Date()).toISOString()
                })


            } else {
                newConsultation = new Consultation({
                    agent_matricule: req.body.matricule,
                    date: (new Date()).toISOString(),
                    familyMember: req.body.destination
                })
            }
            await newConsultation.save()
            res.status(200).json({ message: 'consultation added' })
        } else {
            res.status(404).json({ message: 'agent with this matricule not found' })

        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })

    }
}