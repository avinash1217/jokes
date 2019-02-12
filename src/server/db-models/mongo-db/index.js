'use strict'

import mongoose from '../../db-connector/mongo-db'
import * as schemas from '../../db-schemas/mongo-db'
export const UserModel = mongoose.model('User', schemas.UserSchema)
export const JokeModel = mongoose.model('Joke', schemas.JokeSchema)
