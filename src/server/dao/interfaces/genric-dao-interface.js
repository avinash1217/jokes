/**
 * TODO - write description
 */
'use strict'
import { logger } from '../../../common-utils'

/**
 * returns a promise without implementing anything
 * @param {*} payload
 */
const mutedBody = (payload) => {
  return new Promise((resolve, reject) => {
    logger.error('DAO Implementation not found')
    resolve()
  })
}

export const GenericDaoInterface = {
  create: mutedBody,
  update: mutedBody,
  fetchOne: mutedBody,
  fetchAll: mutedBody,
  fetchByParams: mutedBody,
  remove: mutedBody
}
