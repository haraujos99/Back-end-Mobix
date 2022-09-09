const securePassword = require('secure-password');
const pwd = securePassword();
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const { jwtSecret } = require('../services/jwtSecret');


const signUp = async (req, res) => {
    const { userName, password } = req.body;

    try {
        const userFound = await User.find({userName});

        if (userFound.length > 0) {
            return res.status(400).json({ "message": "User already exists" });
        }

        const hash = (await pwd.hash(Buffer.from(password))).toString('hex');
        const userData = {
            userName,
            password: hash
        }
        const userRegistered = await User.create(userData)

        if (userRegistered.length === 0) {
            return res.status(500).json({ "message": "Was not possible to register" });
        }

        return res.status(201).json({ "message": "User registered successfully" });

    } catch (error) {
        return res.status(500).json({ "message": error.message });
    }
}

const signIn = async (req, res) => {
    const { userName, password } = req.body;

    try {

        const userFound = await User.find({userName});

        if (userFound.length === 0) {
            return res.status(404).json({ "message": "User not found" });
        }

        const user = userFound[0]
        const result = await pwd.verify(Buffer.from(password), Buffer.from(user.password, 'hex'))

        switch (result) {
            case securePassword.INVALID_UNRECOGNIZED_HASH:
            case securePassword.INVALID:
                return res.status(400).json({ "message": "Wrong password" });
            case securePassword.VALID:
                break
            case securePassword.VALID_NEEDS_REHASH:
                try {
                    const hash = (await pwd.hash(Buffer.from(password))).toString('hex')
                    const data = {
                        userName: user.userName,
                        password: hash
                    }
                    await User.findByIdAndUpdate({_id: user._id}, data,  {new: true})
                } catch {
                }
                break
        }

        const token = jwt.sign({
            _id: user._id,
            userName: user.userName
        }, jwtSecret, {
            expiresIn: '8h'
        })

        return res.status(200).json({
            "usuario": user.userName,
            "token": token
        });

    } catch (error) {
        return res.status(500).json({ "message": error.message });

    }

}

module.exports = {
    signIn,
    signUp
}