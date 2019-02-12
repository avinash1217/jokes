'use strict'

import mongoose from '../../db-connector/mongo-db'
import * as schemas from '../../db-schemas/mongo-db'

export default {
  UserModel: mongoose.model('User', schemas.UserSchema),
  JokeModel: mongoose.model('Joke', schemas.JokeSchema)
}
