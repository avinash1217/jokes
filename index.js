'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import * as utils from './src/common-utils'
import { setUpClientRoutes } from './src/client/routes'
import { setUpServerRoutes } from './src/server/routes'
import { setUpExpressMiddlewares } from './src/server/middlewares'

const logger = utils.logger
const port = process.env.PORT || 3000
const app = express()

logger.info(`ENV: ${process.env.NODE_ENV}`)
logger.info(`VERSION: ${process.env.npm_package_version}`)

// initialize the application
app.enable('trust proxy')
app.use(cookieParser())
app.use(morgan('short', {
  // Excluding logs for healthCheck which clutters the log with high freq periodic calls.
  skip: (req, res) => { return req.originalUrl === '/status' || req.originalUrl === '/' }
}))
app.use(bodyParser.json({ limit: '50mb' })) // TODO - move to config
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

// set up application routes
setUpClientRoutes(app)
setUpExpressMiddlewares(app)
setUpServerRoutes(app)

// catch 404 and forwarding to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// start the server only if directly run
// else export app for unit testing
if (require.main === module) {
  app.listen(port, () => {
    logger.info('We are live on: ' + port)
  })
}

process.on('uncaughtException', err => {
  logger.error('UNCAUGHT EXCEPTION: ', err.stack)
})

module.exports = app
