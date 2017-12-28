const http = require('http')
const express = require('express')
const app = express()
// const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')

app.use('/api/blogs', blogsRouter)
app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

const mongoUrl = 'mongodb://127.0.0.1:27017'
mongoose.connect(mongoUrl, { useMongoClient: true })
mongoose.Promise = global.Promise

// app.get('/api/blogs', (request, response) => {
//     Blog
//         .find({})
//         .then(blogs => {
//             response.json(blogs)
//         })
// })

// app.post('/api/blogs', (request, response) => {
//     const blog = new Blog(request.body)
//     console.log(blog)
//     blog
//         .save()
//         .then(result => {
//             response.status(201).json(result)
//         })
// })

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})