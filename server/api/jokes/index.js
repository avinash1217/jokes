//Glues together the api parts
const db = require('./../../core/db')
const Joke = require('./models/joke')
const Category = require('./models/category')

const jokesRouter = require('./routes/jokes')({
    get: (id) => Joke.findById(id).populate('category'),
    insert: (payload) => Joke.create(payload),
    update: (id, payload) => {
        return Joke.findById(id)
        .then(joke => Object.assign(joke, payload))
        .then(joke => joke.save())
    },
    remove: (id) => Joke.findOneAndRemove({_id: id})
})

//TODO
const categoriesRouter = require('./routes/categories')({
    get: (id) => {},
    update: (id) => {},
    remove: (id) => {}
})

module.exports = {
    jokesRouter: jokesRouter,
    categoriesRouter: categoriesRouter
}