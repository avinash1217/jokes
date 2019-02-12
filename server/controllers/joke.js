'use strict'
const jokeService = require('../services/joke')

/**
 * controller to get all jokes
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
function getFilteredJokes (req, res) {
  // if no query params are passed, then all jokes are fetched
  // else jokes filtered by these params are fetched
  return jokeService.fetchFilteredJokes(req.query).then((allJokes) => {
    return res.send(allJokes)
  }).catch((err) => {
    return res.status(500).send(err.data)
  })
}

/**
 * controller to create a new joke
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
function createJoke (req, res) {
  jokeService.createJoke(req.body).then((jokeId) => {}).catch((err) => {
    res.status(400).send(err.data)
  })
}

/**
 * controller to update an existing joke
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
function udateJokeById (req, res) {
  jokeService.updateJokes({
    filter: {
      'id': req.params.id
    },
    data: req.body
  }).then((jokes) => {
    return res.send('200 OK!')
  }).catch((err) => {
    return res.status(400).send(err.data)
  })
}

/**
 * controller to get a joke by id
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
function getJokeById (req, res) {
  jokeService.fetchFilteredJokes({
    'id': req.params.id
  }).then((jokes) => {
    return res.send(jokes && jokes[0])
  }).catch((err) => {
    return res.status(400).send(err.data)
  })
}

/**
 * controller to delete a joke by id
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
function deleteJokeById (req, res) {
  jokeService.deleteJoke({
    'id': req.params.id
  }).then((jokes) => {
    return res.send('200 OK!')
  }).catch((err) => {
    return res.status(400).send(err.data)
  })
}

module.exports = {
  getFilteredJokes,
  createJoke,
  udateJokeById,
  getJokeById,
  deleteJokeById
}
