const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./jwtSecret');
const User = require('../model/user.model');

const checkSignin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ "message": "You must be logged in and with the token" });
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { _id } = await jwt.verify(token, jwtSecret);

        const userFound = await User.findById({_id})

        if (userFound.length === 0) {
            return res.status(404).json({ "message": "User not found" });
        }

        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ "message": "You must be logged in and with the token" });
        }
        return res.status(500).json({"mensagem": error.message});
    }
}

module.exports = { checkSignin };
