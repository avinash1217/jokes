'use strict'

import mongoose from '../../db-connector/mongo-db'
import * as constants from '../../constants'

const Schema = mongoose.Schema
const USER_ATTRIBUTES = constants.USER_ATTRIBUTES

export const UserSchema = new Schema({
  [USER_ATTRIBUTES.firstName]: String,
  [USER_ATTRIBUTES.lastName]: String,
  [USER_ATTRIBUTES.emailId]: String,
  [USER_ATTRIBUTES.password]: String
})
