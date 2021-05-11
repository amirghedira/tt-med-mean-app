const Agent = require('../models/Agent')
const FamilyMember = require('../models/FamilyMembre')



exports.createAgent = async (req, res) => {
    try {
        const createdAgent = await Agent.create(req.body.agent)
        res.status(200).json({ createdAgent: createdAgent })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getAgent = async (req, res) => {
    try {
        const agent = await Agent.findOne({ _id: req.params.id })
            .populate('familyMembers')

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
        const agents = await Agent.find().populate('familyMembers')
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
        res.status(500).json({ error: error.message })
    }
}


exports.addAgentFamilyMember = async (req, res) => {
    try {
        const createdFamilyMember = await FamilyMember.create(req.body.familyMember)
        const agent = await Agent.findOne({ _id: req.params.id })
        if (agent) {
            agent.familyMember.push(createdFamilyMember)
            await agent.save()
            res.status(200).json({ message: 'family member added' })

        } else
            return res.status(404).json({ message: 'agent not found' })



    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
