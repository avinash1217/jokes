'use strict'

const mongoose = require('../../db-connector/mongo-db')
const schemas = require('../../db-schemas/mongo-db')

module.exports = {
  UserModel: mongoose.model('User', schemas.UserSchema),
  JokeModel: mongoose.model('Joke', schemas.JokeSchema)
}
