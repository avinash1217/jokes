'use strict'
const UserDao = require('../dao/mongo-db').UserDao
const USER_ATTRIBUTES = require('../constants').USER_ATTRIBUTES
const errCodes = require('../../common-constants').errCodes
const logger = require('../../common-utils').logger

/**
 * returns a promise that resolves to user id on success
 * @param {object} payload
 * @param {string} payload.userId
 * @param {string} payload.password
 */
function loginUser (payload) {
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

module.exports = {
  loginUser
}
