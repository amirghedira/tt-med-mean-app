const express = require('express')
const router = express.Router()
const AuthGuard = require('../middleware/AuthGuard')
const {
    getConnectedUser,
    getUser,
    getUsers,
    updateUserInfo,
    deleteUser,
    userLogin,
    createUser,
    updateUserPassword,
    addDoctor,
    addNurse,
    updateNurse,
    updateDoctor,
    getDoctors,
    getNurses
} = require('../controller/user')


router.get('/connected-user', AuthGuard, getConnectedUser)
router.get('/', getUsers)
router.get('/doctor', getDoctors)
router.get('/nurse', getNurses)
router.get('/:userId', getUser)
router.post('/', createUser)
router.post('/login', userLogin)
router.post('/doctor', AuthGuard, addDoctor)
router.post('/nurse', AuthGuard, addNurse)

router.patch('/', AuthGuard, updateUserInfo)
router.patch('/password', AuthGuard, updateUserPassword)
router.patch('/nurse/:id', AuthGuard, updateNurse)
router.patch('/doctor/:id', AuthGuard, updateDoctor)

router.delete('/:userId', deleteUser)

module.exports = router