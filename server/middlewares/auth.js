const {verifyToken} = require('../helpers/jwt');
const {User} = require('../models');

const authenticate = (req, res, next) => {
    const user = verifyToken(req.headers.token, process.env.JWT_SECRET);
    User.findOne({
        where: {
            id: user.id,
            email: user.email
        }
    })
        .then((user) => {
            req.currentUser = {id: user.id, email: user.email};
            next();
        })
        .catch(next)
}

module.exports = authenticate