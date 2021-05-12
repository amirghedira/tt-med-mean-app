const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

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
        const users = await User.find()
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
        if (req.body.telecomPass === process.env.telecomPass) {
            const hashedPassword = await bcrypt.hash(req.body.user.password, 11)
            req.body.user.password = hashedPassword;
            const createdUser = await User.create(req.body.user)
            res.status(200).json({ user: createdUser })
        } else {
            res.status(400).json({ message: 'unvalid telecom password' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({
            $or: [
                {
                    email: req.body.username.toLowerCase(),
                },
                {
                    username: req.body.username,
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



exports.addDoctor = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.doctor.password, 11)
        req.body.doctor.password = hashedPassword;
        const createdDoctor = await User.create(req.body.doctor)
        res.status(200).json({ doctor: createdDoctor })

    } catch (error) {
        res.status(500).json({ error: error.message });


    }

}
exports.addNurse = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.nurse.password, 11)
        req.body.nurse.password = hashedPassword;
        const createdNurse = await User.create(req.body.nurse)
        res.status(200).json({ user: createdNurse })

    } catch (error) {
        res.status(500).json({ error: error.message });


    }

}
exports.updateNurse = async (req, res) => {
    try {
        await User.updateOne({ _id: req.nurse._id }, { $set: { ...req.body.newNurse } });
        res.status(200).json({ message: "nurse updated successfully", });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
exports.updateDoctor = async (req, res) => {
    try {
        await User.updateOne({ _id: req.nurse._id }, { $set: { ...req.body.newDoctor } });
        res.status(200).json({ message: "doctor updated successfully", });
    } catch (error) {
        res.status(500).json({ error: error.message });


    }

}
exports.getDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' })
        res.status(200).json({ doctors: doctors })
    } catch (error) {
        res.status(500).json({ error: error.message });


    }

}
exports.getNurses = async (req, res) => {
    try {
        const nurses = await User.find({ role: 'nurse' })
        res.status(200).json({ nurses: nurses })
    } catch (error) {
        res.status(500).json({ error: error.message });

    }

}