/**
 * TODO - write description
 */
'use strict'
const logger = require('../../../common-utils').logger

/**
 * returns a promise without implementing anything
 * @param {*} payload
 */
function mutedBody (payload) {
  return new Promise((resolve, reject) => {
    logger.error('DAO Implementation not found')
    resolve()
  })
}

module.exports = {
  create: mutedBody,
  update: mutedBody,
  fetchOne: mutedBody,
  fetchAll: mutedBody,
  fetchByParams: mutedBody,
  remove: mutedBody
}
