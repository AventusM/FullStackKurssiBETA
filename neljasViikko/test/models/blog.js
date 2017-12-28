const mongoose = require('mongoose')

const Blog = mongoose.model('Blog', {
    title: String,
    author: String,
    web: String,
    likes: Number
})

module.exports = Blog