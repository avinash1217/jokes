'use strict'

const authService = require('../services/authentication')
const jwtMiddleware = require('../middlewares/auth/jwt-standard')

/**
 * controller to login the user
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
function loginUser (req, res) {
  return authService.loginUser(req.body).then((id) => {
    jwtMiddleware.setSession(res, {
      id
    })
    res.send('200 Ok!')
  }).catch((e) => {
    res.status(401).send(e.data)
  })
}

/**
 * controller to logout the user
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
function logoutUser (req, res) {

}

module.exports = {
  loginUser,
  logoutUser
}
