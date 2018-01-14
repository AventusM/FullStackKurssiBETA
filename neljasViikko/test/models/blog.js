const mongoose = require('mongoose')

const Blog = mongoose.model('Blog', {
    title: String,
    author: String,
    url: String,
    likes: Number,
    //Jokaisella blogilla yksi lisääjä
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //Anonyymit kommentit (taulukoitu)
    comments: []
})

module.exports = Blog