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
    getNurses,
    getDoctor,
    getNurse,
    markDoctorPresent
} = require('../controller/user')


router.get('/connected-user', AuthGuard, getConnectedUser)
router.get('/', getUsers)
router.get('/doctor', getDoctors)
router.get('/nurse', getNurses)
router.get('/doctor/:mat', getDoctor)
router.get('/nurse/:mat', getNurse)

router.get('/:userId', getUser)
router.post('/', createUser)
router.post('/login', userLogin)
router.post('/doctor', AuthGuard, addDoctor)
router.post('/nurse', AuthGuard, addNurse)

router.patch('/', AuthGuard, updateUserInfo)
router.patch('/presence/:matricule', AuthGuard, markDoctorPresent)
router.patch('/nurse/:id', AuthGuard, updateNurse)
router.patch('/doctor/:id', AuthGuard, updateDoctor)
router.patch('/password', AuthGuard, updateUserPassword)

router.delete('/:userId', deleteUser)

module.exports = router