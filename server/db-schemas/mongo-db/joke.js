'use strict'
const env = require('tiny-config')

const mongoose = require('../../db-connector/mongo-db')
const constants = require('../../constants')

const Schema = mongoose.Schema
const JOKE_ATTRIBUTES = constants.JOKE_ATTRIBUTES

const JokeSchema = new Schema({
  [JOKE_ATTRIBUTES.content]: { type: String, required: true },
  [JOKE_ATTRIBUTES.genre]: String, // to filter jokes by genre
  [JOKE_ATTRIBUTES.title]: String
}, {
  timestamps: true,
  autoCreate: env.get('autoCreateCollection') // to filter jokes by created time and updated time
})

module.exports = JokeSchema
