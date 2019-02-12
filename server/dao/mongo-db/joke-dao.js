'use strict'

const GenericDaoInterface = require('../interfaces/genric-dao-interface')
const JokeModel = require('../../db-models/mongo-db').JokeModel
const JOKE_ATTRIBUTES = require('../../constants').JOKE_ATTRIBUTES
const logger = require('../../../common-utils').logger
const errCodes = require('../../../common-constants').errCodes

let JokeDao = Object.create(GenericDaoInterface)

/**
 * returns a promise that resolves to document id when saved
 * @param {object} payload - attributes as defined in the joke schema
 */
function create (payload) {
  return new Promise((resolve, reject) => {

  })
}

JokeDao = Object.assign(JokeDao, {
  create
})

module.exports = JokeDao
