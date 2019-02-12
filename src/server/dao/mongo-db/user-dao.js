'use strict'

import { GenericDaoInterface } from '../interfaces/genric-dao-interface'
import { UserModel } from '../../db-models/mongo-db'
import { logger } from '../../../common-utils'
import { errCodes } from '../../../common-constants'
import { USER_ATTRIBUTES } from '../../constants'

export let UserDao = Object.create(GenericDaoInterface)

/**
 * returns a promise that resolves to fetched user model instance
 * @param {object} payload
 * @param {string} payload.userId
 */
const fetchOne = (payload) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({
      [USER_ATTRIBUTES.emailId]: payload.userId
    }, (err, res) => {
      console.log(`+++++++++++++++ ${JSON.stringify(payload)}`)
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
