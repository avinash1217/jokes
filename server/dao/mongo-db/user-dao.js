'use strict'

const GenericDaoInterface = require('../interfaces/genric-dao-interface')
const UserModel = require('../../db-models/mongo-db').UserModel
const USER_ATTRIBUTES = require('../../constants').USER_ATTRIBUTES
const logger = require('../../../common-utils').logger
const errCodes = require('../../../common-constants').errCodes

let UserDao = Object.create(GenericDaoInterface)

/**
 * returns a promise that resolves to fetched user model instance
 * @param {object} payload
 * @param {string} payload.userId
 */
function fetchOne (payload) {
  return new Promise((resolve, reject) => {
    UserModel.findOne({
      [USER_ATTRIBUTES.emailId]: payload.userId
    }, (err, res) => {
      if (err) {
        logger.error(`error while fetching user by id => ${err}`)
        return reject(new Error({
          errCode: errCodes.INPUT_ATTR_INVALID
        }))
      } else if (!res) {
        logger.error(`empty user exist for the id`)
        return reject(new Error({
          errCode: errCodes.INPUT_ATTR_INVALID
        }))
      }
      resolve(res)
    })
  })
}

UserDao = Object.assign(UserDao, {
  fetchOne
})

module.exports = UserDao
