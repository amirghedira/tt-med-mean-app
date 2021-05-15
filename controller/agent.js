const Agent = require('../models/Agent')
const DossierMedical = require('../models/DossierMedical')
const mongoose = require('mongoose')
const FamilyMember = require('../models/FamilyMember')

exports.createAgent = async (req, res) => {
    try {

        const agentId = new mongoose.Types.ObjectId()
        const familyMembers = req.body.familyMembers.map(familyMember => {
            return {
                ...familyMember,
                _id: new mongoose.Types.ObjectId(),
                agent: agentId,
            }
        })
        const createdFamilyMembers = await FamilyMember.create(familyMembers)
        const createdAgent = await Agent.create({ ...req.body, _id: agentId, familyMembers: createdFamilyMembers })
        await DossierMedical.create({ agent: agentId, agent_matricule: createdAgent.matricule })
        familyMembersDossierMedical = createdFamilyMembers.map(familyMember => {
            return {
                familyMember: familyMember._id,
                type: 'other',
                agent_matricule: createdAgent.matricule
            }
        })
        await DossierMedical.create(familyMembersDossierMedical)

        res.status(200).json({ createdAgent: createdAgent })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

exports.getAgent = async (req, res) => {
    try {
        const agent = await Agent.findOne({ matricule: req.params.id })
            .populate('familyMembers')

        if (agent) {
            res.status(200).json({ agent: agent })
        } else {
            return res.status(404).json({ message: 'agent not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

exports.getAgents = async (req, res) => {
    try {
        const agents = await Agent.find()
            .populate('familyMembers')

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

            req.body.familyMember._id = new mongoose.Types.ObjectId()
            await FamilyMember.create(req.body.familyMember)
            agent.familyMember.push(req.body.familyMember)
            await agent.save()
            res.status(200).json({ message: 'family member added' })

        } else
            return res.status(404).json({ message: 'agent not found' })



    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
