const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.getConnectedUser = async (req, res) => {
    try {
        const connectedUser = await User.findOne({ _id: req.user._id })
        res.status(200).json({ connectedUser: connectedUser })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
        res.status(200).json({ user: user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findOne({ _id: req.params.userId })
        res.status(200).json({ users: users })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.updateUserPassword = async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.user._id })
        if (user) {
            const result = await bcrypt.compare(req.body.oldPassword, user.password)
            if (result) {
                const hashedPassword = await bcrypt.hash(req.body.newPassword, 11)
                user.password = hashedPassword
                await user.save()
                res.status(200).json({ message: 'user password updated successfully' })
            } else {
                res.status(409).json({ message: 'old password is wrong' })
            }


        }
        else
            res.status(404).json({ message: 'user not found' })

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}


exports.updateUserInfo = async (req, res) => {
    let ops = {};
    for (let obj of req.body) {
        ops[obj.propName] = obj.value;
    }
    try {
        await User.updateOne(
            {
                _id: req.user._id,
            },
            {
                $set: ops,
            }
        );
        res.status(200).json({
            message: "user updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


exports.deleteUser = async (req, res) => {
    try {

        await User.deleteOne({ _id: req.params.userId })
        res.status(200).json({ message: 'user successfully deleted' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 11)
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role
        })
        const createdUser = await newUser.save()
        res.status(200).json({ user: createdUser })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({
            $or: [
                {
                    email: req.body.email.toLowerCase(),
                },
                {
                    username: req.body.email,
                },
            ],
        }).exec();
        if (user) {
            const result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                const payload = {
                    _id: user._id,
                    email: user.email,
                    username: user.username
                };
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY);

                res.status(200).json({ accessToken, user });
            } else {
                res.status(400).json("Auth failed");
            }
        } else {
            res.status(400).json("Auth failed");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};