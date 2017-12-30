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
        res.status(400).json({ error: 'something went wrong' })
    }
})

blogsRouter.post('/', async (req, res) => {
    try {
        console.log('POST')
        const body = req.body
        if (body.title === undefined || body.url === undefined || body.title.trim() === "" || body.url.trim() === "") {
            return res.status(400).json({ error: 'otsikko ja/tai url puuttuu' })
        }

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0
        })

        const savedBlog = await blog.save({})
        res.status(200).json(savedBlog)

    } catch (exception) {
        console.log(exception)
        res.status(500).json({ error: 'something went wrong' })
    }
})

blogsRouter.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).send("Success").end()
    } catch (exception) {
        console.log(exception)
        res.status(400).json({ error: 'something went wrong, try having a look at the id' })
    }
})

module.exports = blogsRouter