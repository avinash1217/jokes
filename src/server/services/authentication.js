'use strict'
import { UserDao } from '../dao/mongo-db'
import { USER_ATTRIBUTES } from '../constants'
import { errCodes } from '../../common-constants'
import { logger } from '../../common-utils'

/**
 * returns a promise that resolves to user id on success
 * @param {object} payload
 * @param {string} payload.userId
 * @param {string} payload.password
 */
export const loginUser = (payload) => {
  return UserDao.fetchOne(payload).then((userIntance) => {
    // TODO - ensure to use a hashing mechanism for password
    // TODO - ensure the password passed through communication channels is encrypted
    if (payload.password !== userIntance[USER_ATTRIBUTES.password]) {
      logger.error('user does not match for the provided input')
      throw new Error({
        errCode: errCodes.INPUT_ATTR_INVALID
      })
    }
    return userIntance.id
  })
}
