'use strict'

import * as env from 'tiny-config'
import * as winston from 'winston'

const logLevel = env.get('logLevel')

/**
* logger console config
*/
const consoleTransport = new (winston.transports.Console)({
  timestamp () {
    return Date.now()
  },
  formatter (options) {
    return `${options.timestamp()} ${
      winston.config.colorize(options.level, options.level.toUpperCase())} ${
      options.message ? options.message : ''
    }${options.meta && Object.keys(options.meta).length ? `\n\t${JSON.stringify(options.meta)}` : ''}`
  }
})

// Creating logger
export const logger = new (winston.Logger)({
  level: logLevel,
  transports: [
    consoleTransport
  ],

  exitOnError: false
})
