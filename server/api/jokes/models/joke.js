const mongoose = require('mongoose')

const jokeSchema = new mongoose.Schema({
    content: String,
    categories: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

const Joke = mongoose.model('Joke', jokeSchema)

module.exports = Joke