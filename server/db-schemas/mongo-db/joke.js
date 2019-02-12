'use strict'
const env = require('tiny-config')

const mongoose = require('../../db-connector/mongo-db')
const constants = require('../../constants')

const Schema = mongoose.Schema
const JOKE_ATTRIBUTES = constants.JOKE_ATTRIBUTES

const JokeSchema = new Schema({
  [JOKE_ATTRIBUTES.content]: String,
  [JOKE_ATTRIBUTES.genre]: String,
  [JOKE_ATTRIBUTES.title]: String
}, {
  timestamps: true,
  autoCreate: env.get('autoCreateCollection')
})

module.exports = JokeSchema
