const express = require('express')
const Blog = require('../models/blog')
const blogsRouter = express.Router()
const bodyParser = require('body-parser')
blogsRouter.use(bodyParser.json())

blogsRouter.get('/', async (req, res) => {
    console.log("GET")
    // Blog
    //     .find({})
    //     .then(blogs => {
    //         console.log(blogs)
    //         res.json(blogs)
    //     })
    const blogs = await Blog.find({})
    console.log(blogs)
    res.json(blogs)
})

blogsRouter.post('/', (req, res) => {
    const blog = new Blog(req.body)
    blog
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json(result)
        })
})

module.exports = blogsRouter