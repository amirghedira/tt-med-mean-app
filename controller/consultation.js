const Consultation = require('../models/Consultation')
const Agent = require('../models/Agent')
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

        console.log(req.body)
        const agent = await Agent.findOne({ matricule: req.body.matricule })
        if (agent) {
            const { type } = req.query
            let newConsultation;
            if (type === 'agent') {

                newConsultation = new Consultation({
                    agent_matricule: req.body.matricule,
                    agent: req.body.destination,
                    date: (new Date()).toISOString(),
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