const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    title: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category