const express = require('express')
const {
    getAgents,
    createAgent,
    getAgent,
    updateAgent,
    addAgentFamilyMember
} = require('../controller/agent')
const router = express.Router()
const AuthGuard = require('../middleware/AuthGuard')


router.get('/', AuthGuard, getAgents)
router.get('/:id', AuthGuard, getAgent)
router.post('/', AuthGuard, createAgent)
router.post('/:id/family-member', AuthGuard, addAgentFamilyMember)


router.patch('/:id', AuthGuard, updateAgent)


module.exports = router