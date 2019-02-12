'use strict'

const mongoose = require('mongoose')
const env = require('tiny-config')
const utils = require('../../../common-utils')

const logger = utils.logger

mongoose.connect(`mongodb://${env.get('dbServer')}/${env.get('dbName')}`)

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  logger.info(`Mongoose default connection open to => ${env.get('dbServer')}`)
})

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  logger.info('Mongoose default connection error: ' + err)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected')
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})

module.exports = mongoose
