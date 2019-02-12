'use strict'

import * as constants from './constants'
import * as authenticationController from './controllers/authentication'
import * as jokeController from './controllers/joke'

const ROUTES = constants.ROUTES

/**
 * sets up express routes for server
 * @param {Express} app - node js express app
 */
export const setUpServerRoutes = (app) => {
  app.route(ROUTES.LOGIN)
    .post(authenticationController.loginUser)

  app.route(ROUTES.LOGOUT)
    .post(authenticationController.logoutUser)

  app.route(ROUTES.JOKE)
    .post(jokeController.createJoke)
    .get(jokeController.getFilteredJokes)

  app.route(`${ROUTES.JOKE}/:id`)
    .patch(jokeController.udateJokeById)
    .get(jokeController.getJokeById)
    .delete(jokeController.deleteJokeById)
}
