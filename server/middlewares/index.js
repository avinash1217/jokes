'use strict'

const jwtStandardAuthMiddleware = require('./auth/jwt-standard').middlewareRouter

const allMiddlewares = []

Array.prototype.push.apply(allMiddlewares, jwtStandardAuthMiddleware)

/**
 * sets up express routes for client application
 * @param {Express} app - node js express app
 */
function setUpExpressMiddlewares (app) {
  allMiddlewares.forEach((elem) => {
    app.use(elem.mountOn, elem.middleware)
  })
}

module.exports = setUpExpressMiddlewares
