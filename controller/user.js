const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const moment = require('moment');

exports.markDoctorPresent = async (req, res) => {
    try {
        const doctor = await User.findOne({ matricule: req.params.matricule })
        if (doctor) {
            const todayPresenceIndex = doctor.workingHours.findIndex(workingHour => {
                return moment(new Date(workingHour)).isSame(moment(new Date(req.body.presenceDate)), 'day')
            })
            if (todayPresenceIndex === -1) {
                const presenceDate = new Date(req.body.presenceDate)
                await User.updateOne({ _id: doctor._id }, { $push: { workingHours: presenceDate.toISOString() } })
                res.status(200).json({ message: 'doctor presence marked successfully', nom: doctor.nom, prenom: doctor.prenom })

            } else {
                res.status(400).json({ message: 'Doctor already present' })
            }
        } else {
            res.status(404).json({ message: 'doctor not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })

    }
}
exports.getConnectedUser = async (req, res) => {
    try {
        const connectedUser = await User.findOne({ _id: req.user._id })
        res.status(200).json({ connectedUser: connectedUser })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getDoctor = async (req, res) => {
    try {
        const doctor = await User.findOne({ matricule: req.params.mat, role: 'doctor' })
        if (doctor)
            res.status(200).json({ doctor: doctor })
        else
            res.status(404).json({ message: 'user not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.getNurse = async (req, res) => {
    try {
        const nurse = await User.findOne({ matricule: req.params.mat, role: 'nurse' })
        if (nurse)
            res.status(200).json({ nurse: nurse })
        else
            res.status(404).json({ message: 'user not found' })
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
    let objToUpdate = {};
    let testObj = []
    for (let obj of req.body) {
        objToUpdate[obj.propName] = obj.value;
    }
    try {
        if (objToUpdate.username || objToUpdate.email) {
            if (objToUpdate.email && objToUpdate.email != req.user.email)
                testObj.push({ email: objToUpdate.email })
            if (objToUpdate.username && objToUpdate.username != req.user.username)
                testObj.push({ username: objToUpdate.username })

            if (testObj.length > 0) {
                const existUser = await User.findOne({ $or: testObj })
                if (existUser && existUser._id.toString() != req.user._id)
                    return res.status(409).json({ message: "username or email already in use" });
            }
        }
        await User.updateOne(
            {
                _id: req.user._id,
            },
            {
                $set: objToUpdate,
            }
        );
        res.status(200).json({ message: "user updated successfully", });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
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
            const existUser = await User.findOne({
                $or: [
                    { username: req.body.user.username },
                    { email: req.body.user.email },
                ]
            })
            if (existUser) {
                res.status(409).json({ message: 'unvalid telecom password' })

            } else {
                const hashedPassword = await bcrypt.hash(req.body.user.password, 11)
                req.body.user.password = hashedPassword;
                const createdUser = await User.create(req.body.user)
                res.status(200).json({ user: createdUser })
            }
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
        const existDoctor = await User.findOne({
            $or: [
                { matricule: req.body.doctor.matricule },
                { username: req.body.doctor.username },
                { email: req.body.doctor.email },
            ]
        })
        if (existDoctor) {
            res.status(400).json({ message: 'Doctor with this matricule already exists' })

        } else {
            const hashedPassword = await bcrypt.hash(req.body.doctor.password, 11)
            req.body.doctor.password = hashedPassword;
            const createdDoctor = await User.create(req.body.doctor)
            res.status(200).json({ doctor: createdDoctor })
        }


    } catch (error) {
        res.status(500).json({ error: error.message });


    }

}
exports.addNurse = async (req, res) => {
    try {
        const existNurse = await User.findOne({
            $or: [
                { matricule: req.body.nurse.matricule },
                { username: req.body.nurse.username },
                { email: req.body.nurse.email },

            ]
        })
        if (existNurse) {
            res.status(400).json({ message: 'Nurse with this matricule already exists' })

        } else {
            const hashedPassword = await bcrypt.hash(req.body.nurse.password, 11)
            req.body.nurse.password = hashedPassword;
            const createdNurse = await User.create(req.body.nurse)
            res.status(200).json({ user: createdNurse })
        }

    } catch (error) {
        res.status(500).json({ error: error.message });


    }

}
exports.updateNurse = async (req, res) => {
    try {
        const existNurse = await User.findOne({ username: req.body.newNurse.username })
        if (existNurse && existNurse._id.toString() != req.body.newNurse._id.toString()) {
            res.status(409).json({ message: "username already in use", });
        }
        else {
            if (req.body.newNurse.password.length > 0) {
                const hashedPassword = await bcrypt.hash(req.body.newNurse.password, 11)
                req.body.newNurse.password = hashedPassword;
            }
            await User.updateOne({ _id: req.params.id }, { $set: { ...req.body.newNurse } });
            res.status(200).json({ message: "nurse updated successfully", });
        }


    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
exports.updateDoctor = async (req, res) => {
    try {
        const existDoctor = await User.findOne({ username: req.body.newDoctor.username })
        if (existDoctor && existDoctor._id.toString() != req.body.newDoctor._id.toString()) {
            res.status(409).json({ message: "username already in use", });
        } else {
            if (req.body.newDoctor.password.length > 0) {
                const hashedPassword = await bcrypt.hash(req.body.newDoctor.password, 11)
                req.body.newDoctor.password = hashedPassword;
            }

            await User.updateOne({ _id: req.params.id }, { $set: { ...req.body.newDoctor } });
            res.status(200).json({ message: "doctor updated successfully", });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });


    }

}
exports.getDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' })
            .sort({ _id: -1 })
        res.status(200).json({ doctors: doctors })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });


    }

}
exports.getNurses = async (req, res) => {
    try {
        const nurses = await User.find({ role: 'nurse' })
            .sort({ _id: -1 })

        res.status(200).json({ nurses: nurses })
    } catch (error) {
        res.status(500).json({ error: error.message });

    }

}