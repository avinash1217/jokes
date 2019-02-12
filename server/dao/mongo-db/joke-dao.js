'use strict'

const GenericDaoInterface = require('../interfaces/genric-dao-interface')
const JokeModel = require('../../db-models/mongo-db').JokeModel
// const JOKE_ATTRIBUTES = require('../../constants').JOKE_ATTRIBUTES
const logger = require('../../../common-utils').logger
const errCodes = require('../../../common-constants').errCodes

let JokeDao = Object.create(GenericDaoInterface)

/**
 * returns a promise that resolves to document id when saved
 * @param {object} payload - attributes as defined in the joke schema
 */
function create (payload) {
  return new Promise((resolve, reject) => {
    JokeModel.create(payload, (err, joke) => {
      if (err) {
        logger.error(`error while creating new joke => ${err}`)
        return reject(new Error({
          errCode: errCodes.INPUT_ATTR_INVALID
        }))
      }
      resolve(joke.id)
    })
  })
}

/**
 * returns a promise that resolves to list of all filtered jokes
 * @param {object} payload - attributes an as defined in the joke schema and their values
 */
function fetchByParams (payload) {
  return new Promise((resolve, reject) => {
    JokeModel.find(payload, (err, jokes) => {
      if (err) {
        logger.error(`error while fetching filtered jokes => ${err}`)
        return reject(new Error({
          errCode: errCodes.INTERNAL_SERVER_ERROR
        }))
      }
      resolve(jokes)
    })
  })
}

/**
 * returns a promise that resolves to list of all filtered jokes
 */
function fetchAll () {
  return new Promise((resolve, reject) => {
    JokeModel.find({}, (err, jokes) => {
      if (err) {
        logger.error(`error while fetching all jokes => ${err}`)
        return reject(new Error({
          errCode: errCodes.INTERNAL_SERVER_ERROR
        }))
      }
      resolve(jokes)
    })
  })
}

/**
 * returns a new promise that resolves to true if update is successfull and false if it fails
 * @param {object} payload
 * @param {object} payload.filter - select the objects to be updated
 * @param {object} payload.data - data to update in the selected objects
 */
function update (payload) {
  return new Promise((resolve, reject) => {
    // TODO - since validators, setters and getters middlewares are skipped, switch to findOneAndUpdate for each matched item in the future
    JokeModel.updateMany(payload.filter, payload.data, (err, jokes) => {
      if (err) {
        logger.error(`error while updating jokes => ${err}`)
        return reject(new Error({
          errCode: errCodes.INTERNAL_SERVER_ERROR
        }))
      }
      resolve(jokes)
    })
  })
}

/**
 * returns a promise that resolves to true if item is found and removed
 * @param {object} payload - attributes an as defined in the joke schema and their values
 */
function remove (payload) {
  return new Promise((resolve, reject) => {
    JokeModel.deleteOne(payload, (err) => {
      if (err) {
        logger.error(`error while removing joke => ${err}`)
        return reject(new Error({
          errCode: errCodes.INPUT_ATTR_INVALID
        }))
      }
      resolve(true)
    })
  })
}

JokeDao = Object.assign(JokeDao, {
  create,
  fetchAll,
  fetchByParams,
  update,
  remove
})

module.exports = JokeDao
