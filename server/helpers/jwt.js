const jwt = require('jsonwebtoken');

const generateToken = (payload, secretKey) => {
    return jwt.sign(payload, secretKey)
}

const verifyToken = (payload, secretKey) => {
    return jwt.verify(payload, secretKey)
}

module.exports = {
    generateToken,
    verifyToken
}