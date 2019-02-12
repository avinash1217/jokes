'use strict'

const mongoose = require('../../db-connector/mongo-db')
const constants = require('../../constants')

const Schema = mongoose.Schema
const USER_ATTRIBUTES = constants.USER_ATTRIBUTES

const UserSchema = new Schema({
  [USER_ATTRIBUTES.firstName]: String,
  [USER_ATTRIBUTES.lastName]: String,
  [USER_ATTRIBUTES.emailId]: String,
  [USER_ATTRIBUTES.password]: String
})

module.exports = UserSchema
