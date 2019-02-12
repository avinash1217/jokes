'use strict'

import * as authService from '../services/authentication'
import { jwtStandardAuthMiddleware } from '../middlewares/auth/jwt-standard'

/**
 * controller to login the user
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export const loginUser = (req, res) => {
  return authService.loginUser(req.body).then((id) => {
    jwtStandardAuthMiddleware.setSession(res, {
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
export const logoutUser = (req, res) => {

}
