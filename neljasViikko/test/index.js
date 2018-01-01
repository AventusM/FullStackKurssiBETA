const http = require('http')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const Blog = require('./models/blog')
const config = require('./utils/config')
const User = require('./models/user')

//SIJAINTI ENNEN REITTEJÄ TOIMIAAKSEEN
const middleware = require('./utils/middleware')
// app.use(middleware.tokenExtractor) <--- failaa tuossa kohdassa

const usersRouter = require('./controllers/users')
app.use('/api/users', usersRouter)

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)
app.use(middleware.tokenExtractor) // <--- sijoitus tuohon, vertailu notesRouter ja middleware.erroriin

const loginRouter = require('./controllers/login')
app.use('/api/login', loginRouter)

app.use(cors())

mongoose.connect(config.mongoUrl, { useMongoClient: true })
mongoose.Promise = global.Promise

const PORT = config.port

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
    mongoose.connection.close()
})

module.exports = {
    app, server
}