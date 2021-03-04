const {User} = require('../models');
const {comparePW} = require('../helpers/bcrypt');
const {generateToken} = require('../helpers/jwt');

class UserController {
    static register (req, res, next) {
        User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then((data) => {
                res.status(201).json({id: data.id, email: data.email})
            })
            .catch((err) => {
                next(err)
            })
    }

    static login (req, res, next) {
        User.findOne({where : {email: req.body.email}})
            .then((data) => {
                if(data) {
                    const valid = comparePW(req.body.password, data.password)
                    if (valid) {
                        const access_token = generateToken({
                            id: data.id,
                            email: data.email
                        }, process.env.JWT_SECRET)
                        res.status(200).json({token: access_token})
                    } else {
                        next({
                            code: 403,
                            message: 'Invalid E-Mail or Password'
                        })
                    }
                } else {
                    next({
                        code: 403,
                        message: 'Invalid E-Mail or Password'
                    })
                }
            })
            .catch(() => {
                next({
                    code: '500',
                    message: 'Internal Server Error'
                })
            })
    }
}

module.exports = UserController