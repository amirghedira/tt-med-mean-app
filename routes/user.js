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
    updateUserPassword
} = require('../controller/user')


router.get('/connected-user', AuthGuard, getConnectedUser)
router.get('/:userId', getUser)
router.get('/', getUsers)

router.post('/', createUser)
router.post('/login', userLogin)

router.patch('/', AuthGuard, updateUserInfo)
router.patch('/password', AuthGuard, updateUserPassword)

router.delete('/:userId', deleteUser)

module.exports = router