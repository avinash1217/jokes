'use strict'
const JokeDao = require('../dao/mongo-db').JokeDao
// const JOKE_ATTRIBUTES = require('../constants').JOKE_ATTRIBUTES
// const errCodes = require('../../common-constants').errCodes
// const logger = require('../../common-utils').logger

/**
 * returns a promise that resolves to new joke id on success
 * @param {object} payload - attributes as defined in the joke schema
 */
function createJoke (payload) {
  return JokeDao.create(payload)
}

/**
 *  transforms payload to a form that can be consumed by DAO
 * @param {*} payload - attributes as defined in the joke schema and their filtering options
 */
const prepareQueryPayload = (payload) => {
  // TODO - write a transformer function that translates payload to be parsable by dao eg: min to $gte for mongo
  return payload
}

/**
 * returns a promise that resolves to new joke id on success
 * @param {object} payload - attributes as defined in the joke schema and their filtering options
 */
function fetchFilteredJokes (payload) {
  // TODO - handle paginated results
  if (!payload || !Object.keys(payload).length) { return JokeDao.fetchAll() }
  return JokeDao.fetchByParams(prepareQueryPayload(payload))
}

/**
 * returns a promise that resolves to true if item is found and removed
 * @param {object} payload - attributes an as defined in the joke schema and their values
 */
function deleteJoke (payload) {
  return JokeDao.remove(payload)
}

/**
 * returns a promise that resolves to true if update is successfull and false if it fails
 * @param {object} payload
 * @param {object} payload.filter - select the objects to be updated
 * @param {object} payload.data - data to update in the selected objects
 */
function updateJokes (payload) {
  return JokeDao.update(payload)
}

module.exports = {
  createJoke,
  fetchFilteredJokes,
  deleteJoke,
  updateJokes
}
