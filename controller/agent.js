const Agent = require('../models/Agent')
const DossierMedical = require('../models/DossierMedical')
const mongoose = require('mongoose')
const FamilyMember = require('../models/FamilyMember')

exports.createAgent = async (req, res) => {
    try {

        const existAgent = await Agent.findOne({ matricule: req.body.matricule })
        if (existAgent) {
            res.status(400).json({ message: 'agent with this matricule already exists' })
        } else {
            const agentId = new mongoose.Types.ObjectId()
            let createdAgent;
            if (req.body.familyMembers.lengh > 0) {
                const familyMembers = req.body.familyMembers.map(familyMember => {
                    return {
                        ...familyMember,
                        _id: new mongoose.Types.ObjectId(),
                        agent: agentId,
                    }
                })
                const createdFamilyMembers = await FamilyMember.create(familyMembers)
                createdAgent = await Agent.create({ ...req.body, _id: agentId, familyMembers: createdFamilyMembers })
                await DossierMedical.create({ agent: agentId, agent_matricule: createdAgent.matricule })
                familyMembersDossierMedical = createdFamilyMembers.map(familyMember => {
                    return {
                        familyMember: familyMember._id,
                        type: 'other',
                        agent_matricule: createdAgent.matricule
                    }
                })
                await DossierMedical.create(familyMembersDossierMedical)
            } else {
                createdAgent = await Agent.create({ ...req.body, _id: agentId, familyMembers: [] })
                await DossierMedical.create({ agent: agentId, agent_matricule: createdAgent.matricule })
            }

            res.status(200).json({ createdAgent: createdAgent })
        }

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

        const agent = await Agent.findOne({ _id: req.body.newAgent._id })
        if (agent) {
            const familyMembersToDelete = agent.familyMembers.filter(member =>
                !req.body.newAgent.familyMembers
                    .map(fm => {
                        if (fm._id)
                            return fm._id.toString()
                    })
                    .includes(member._id.toString()))
            await FamilyMember.deleteMany({ _id: { $in: familyMembersToDelete.map(f => f._id) } })
            await DossierMedical.deleteMany({ familyMember: { $in: familyMembersToDelete.map(f => f._id) } })
            const familyMembersToAdd = req.body.newAgent.familyMembers.filter(member => member._id == null).map(familyMember => {
                return {
                    ...familyMember,
                    _id: new mongoose.Types.ObjectId(),
                    agent: agent.matricule,
                }
            })
            const createdFamilyMembers = await FamilyMember.create(familyMembersToAdd)
            if (createdFamilyMembers) {
                const familyMembersDossierMedical = createdFamilyMembers.map(familyMember => {
                    return {
                        familyMember: familyMember._id,
                        type: 'other',
                        agent_matricule: agent.matricule
                    }
                })
                await DossierMedical.create(familyMembersDossierMedical)
                req.body.newAgent.familyMembers.filter(member => member._id != null).forEach(familyMember => {
                    createdFamilyMembers.push(familyMember)
                })
                await Agent.updateOne({ _id: req.params.id }, { $set: { ...req.body.newAgent, familyMembers: createdFamilyMembers } })

            } else {
                await Agent.updateOne({ _id: req.params.id }, { $set: { ...req.body.newAgent } })

            }
            return res.status(200).json({ message: 'agent successfully updated' })
        } else {
            res.status(404).json({ message: 'agent not found' })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

exports.deleteAgent = async (req, res) => {
    try {
        const agent = await Agent.findOneAndDelete({ _id: req.params.id })
        await FamilyMember.deleteMany({ _id: { $in: agent.familyMembers } })
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
