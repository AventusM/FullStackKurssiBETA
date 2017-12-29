const express = require('express')
const Blog = require('../models/blog')
const blogsRouter = express.Router()
const bodyParser = require('body-parser')
blogsRouter.use(bodyParser.json())

blogsRouter.get('/', async (req, res) => {
    try {
        console.log("GET")
        const blogs = await Blog.find({})
        console.log(blogs)
        res.json(blogs)
    } catch (exception) {
        console.log(exception)
        res.status(500).json({ error: 'something went wrong' })
    }
})

blogsRouter.post('/', async (req, res) => {
    try {
        console.log('POST')
        const body = req.body

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        })

        const savedBlog = await blog.save({})
        res.json(savedBlog)

    } catch (exception) {
        console.log(exception)
        res.status(500).json({ error: 'something went wrong' })
    }
})

module.exports = blogsRouter