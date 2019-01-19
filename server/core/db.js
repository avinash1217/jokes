const config = require('../config')
const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost:27017/${config.dbname}`, {useNewUrlParser: true})
