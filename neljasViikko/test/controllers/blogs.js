const jsonWebToken = require('jsonwebtoken')

const express = require('express')
const Blog = require('../models/blog')
const blogsRouter = express.Router()
const bodyParser = require('body-parser')
blogsRouter.use(bodyParser.json())
const User = require('../models/user')

//Muistiinpanoja voi luoda vain kirjautunut käyttäjä
const getTokenFrom = (req) => {
    //Header
    const auth = req.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7)
    }
    return null
}

//Vastaavanlainen kuin käyttäjillä. Tätä kautta saadaan tietoa
//olemassaolevista lisääjistä
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
    console.log('POST')
    const body = req.body
    console.log(body)
    try {
        const token = getTokenFrom(req)

        if (!token) {
            const blog = new Blog({
                title: body.title,
                author: body.author,
                url: body.url,
                likes: body.likes || 0,
                // haettu POST:lla
                // inputBlog.user saadaan tästä
                user: null
            })
            const savedBlog = await blog.save({})
            res.status(200).json(formatBlog(savedBlog))
            return
        }

        //Käyttäjän id
        //request.token ----> oma middleware käytössä (tokenExtractor)
        const decodedToken = jsonWebToken.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid token' })
        }


        if (body.title === undefined || body.url === undefined || body.title.trim() === "" || body.url.trim() === "") {
            return res.status(400).json({ error: 'otsikko ja/tai url puuttuu' })
        }

        // POST - pyynnössä lähtevän objektin kenttä --> userId
        // Rikkoo nykyisiä testejä
        // MUUTOS
        // const foundUser = await User.findById(body.userId)
        const foundUser = await User.findById(decodedToken.id)
        // console.log(body.userId)

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

        res.status(200).json(formatBlog(savedBlog))

    } catch (exception) {
        console.log(exception)
        if (exception.name === 'JsonWebTokenError') {
            res.status(401).json({ error: exception.message })
        } else {
            res.status(500).json({ error: 'something went wrong' })
        }
    }
})

blogsRouter.delete('/:id', async (req, res) => {
    try {
        console.log('DELETE')
        const blog = await Blog.findById(req.params.id)
        if (!blog.user) {
            await blog.remove()
            return res.status(204).send("Deleted a blog submitted by an anonymous person").end()
        }

        const token = getTokenFrom(req)
        const decodedToken = jsonWebToken.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid token' })
        }

        console.log('lisääjän id - ' + blog.user.toString())
        console.log('token id - ' + decodedToken.id)
        if (blog.user.toString() === decodedToken.id) {
            await blog.remove()
            return res.status(204).send("Success").end()
        }
        return res.status(403).send("Dont try to remove someone elses items")
    } catch (exception) {
        console.log(exception)
        res.status(400).json({ error: 'something went wrong, try having a look at the id' })
    }
})

blogsRouter.put('/:id', async (req, res) => {
    try {
        console.log('PUT')
        const body = req.body
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { $set: { user: body.user, likes: body.likes, author: body.author, title: body.title, url: body.url } }, { new: true }, function (err, result) { })
        res.json(updatedBlog)
    } catch (exception) {
        console.log(exception)
        res.status(400).json({ error: 'something went wrong, try having a look at the id' })
    }
})

module.exports = blogsRouter