'use strict'

const constants = require('./constants')
const authenticationController = require('./controllers/authentication')
const jokeController = require('./controllers/joke')

const ROUTES = constants.ROUTES

/**
 * sets up express routes for server
 * @param {Express} app - node js express app
 */
const setUpRoutes = (app) => {
  app.route(ROUTES.LOGIN)
    .post(authenticationController.loginUser)

  app.route(ROUTES.LOGOUT)
    .post(authenticationController.logoutUser)

  app.route(ROUTES.JOKE)
    .post(jokeController.createJoke)
    .get(jokeController.getFilteredJokes)

  app.route(`${ROUTES.JOKE}/:id`)
    .put(jokeController.udateJokeById)
    .get(jokeController.getJokeById)
    .delete(jokeController.deleteJokeById)
}

module.exports = setUpRoutes
