const {User} = require('../models');
const {comparePW} = require('../helpers/bcrypt');
const {generateToken} = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static register (req, res, next) {
        User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then((data) => {
                res.status(201).json({id: data.id, email: data.email})
            })
            .catch(next);
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
            .catch(next)
    }

    static loginGoogle(req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    
        async function verify() {
          const ticket = await client.verifyIdToken({
              idToken: req.body.token,
              audience: process.env.GOOGLE_CLIENT_ID, 
          });
          const googleUserParams = ticket.getPayload();
    
          // lanjut proses login web
          User.findOrCreate({
            where: {
              email: googleUserParams.email
            },
            defaults: {
              password: (new Date()).toDateString() + googleUserParams.email
            }
          })
            .then(user => {
              const payload = {
                id: user[0].id,
                email: user[0].email,
                name: googleUserParams.given_name
              }
              const access_token = generateToken(payload, process.env.JWT_SECRET);
              res.status(200).json({
                token: access_token,
                name: googleUserParams.given_name,
                email: user[0].email
              })
            })
            .catch(next)
        }
        verify().catch(console.error);
      }
}

module.exports = UserController