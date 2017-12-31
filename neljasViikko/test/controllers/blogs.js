const express = require('express')
const Blog = require('../models/blog')
const blogsRouter = express.Router()
const bodyParser = require('body-parser')
blogsRouter.use(bodyParser.json())
const User = require('../models/user')

//Vastaavanlainen kuin käyttäjillä. Tätä kautta saadaan tietoa
//olemassaolevista OP:sta
const formatBlog = (inputBlog) => {
    return {
        id: inputBlog._id,
        title: inputBlog.title,
        author: inputBlog.author,
        url: inputBlog.url,
        likes: inputBlog.likes,
        user: inputBlog.user
    }
}

blogsRouter.get('/', async (req, res) => {
    try {
        console.log('GET')
        const blogs = await Blog.find({}).populate('user', { _id: 1, username: 1, name: 1 })
        res.json(blogs.map(formatBlog))
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

        // POST - pyynnössä lähtevän objektin kenttä --> userId
        // Rikkoo nykyisiä testejä
        const foundUser = await User.findById(body.userId)
        console.log(body.userId)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            // haettu POST:lla
            // inputBlog.user saadaan tästä
            user: foundUser._id
        })

        const savedBlog = await blog.save({})
        //Päivitetään käyttäjän omaa blogitaulukkoa
        foundUser.blogs = foundUser.blogs.concat(savedBlog._id)
        //Tallennetaan muutos
        await foundUser.save()


        //formatBlog myöhemmin
        res.status(200).json(formatBlog(savedBlog))

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

blogsRouter.put('/:id', async (req, res) => {
    try {
        console.log('PUT')
        const body = req.body

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        })

        //Miten piilotetaan id pois päivityksestä?
        const updatedBlog = await Blog.findByIdAndRemove(req.params.id, { $set: { likes: body.likes } }, { new: true },
            function (err, result) {
                try {
                    res.send(result)
                } catch (exception) {
                    res.send(exception)
                }
            })
        // const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true, id_: 0 })
        res.json(updatedBlog)
    } catch (exception) {
        console.log(exception)
        res.status(400).json({ error: 'something went wrong, try having a look at the id' })
    }
})

module.exports = blogsRouter