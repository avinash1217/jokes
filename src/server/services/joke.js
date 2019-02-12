'use strict'
import { JokeDao } from '../dao/mongo-db'

/**
 * returns a promise that resolves to new joke id on success
 * @param {object} payload - attributes as defined in the joke schema
 */
export const createJoke = (payload) => {
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
export const fetchFilteredJokes = (payload) => {
  // TODO - handle paginated results
  if (!payload || !Object.keys(payload).length) { return JokeDao.fetchAll() }
  return JokeDao.fetchByParams(prepareQueryPayload(payload))
}

/**
 * returns a promise that resolves to true if item is found and removed
 * @param {object} payload - attributes an as defined in the joke schema and their values
 */
export const deleteJoke = (payload) => {
  return JokeDao.remove(payload)
}

/**
 * returns a promise that resolves to true if update is successfull and false if it fails
 * @param {object} payload
 * @param {object} payload.filter - select the objects to be updated
 * @param {object} payload.data - data to update in the selected objects
 */
export const updateJokes = (payload) => {
  return JokeDao.update(payload)
}
