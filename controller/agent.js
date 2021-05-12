const Agent = require('../models/Agent')



exports.createAgent = async (req, res) => {
    try {
        const createdAgent = await Agent.create(req.body)
        res.status(200).json({ createdAgent: createdAgent })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

exports.getAgent = async (req, res) => {
    try {
        const agent = await Agent.findOne({ matricule: req.params.id })

        if (agent) {
            res.status(200).json({ agent: agent })
        } else {
            return res.status(404).json({ message: 'agent not found' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getAgents = async (req, res) => {
    try {
        const agents = await Agent.find()
        res.status(200).json({ agents: agents })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.updateAgent = async (req, res) => {
    try {
        await Agent.updateOne({ _id: req.params.id }, { $set: { ...req.body.newAgent } })
        return res.status(200).json({ message: 'agent successfully updated' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

exports.deleteAgent = async (req, res) => {
    try {
        await Agent.deleteOne({ _id: req.params.id })
        return res.status(200).json({ message: 'agent successfully deleted' })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


exports.addAgentFamilyMember = async (req, res) => {
    try {
        const agent = await Agent.findOne({ _id: req.params.id })
        if (agent) {
            agent.familyMember.push(req.body.familyMember)
            await agent.save()
            res.status(200).json({ message: 'family member added' })

        } else
            return res.status(404).json({ message: 'agent not found' })



    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
