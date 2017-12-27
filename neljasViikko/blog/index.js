const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog') // Varmuuden vuoksi ... (?)

const blogsRouter = require('./controllers/blogs')
//OSOITE SIIS EDELLEEN .../api/blogs eikä pelkkä .../ mitä voisi luulla kontrollerissa
app.use('/api/blogs', blogsRouter) //Reittien lyhennys -> miinuksena voi käyttää vain tätä muotoa kaikissa reiteissä
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

const mongoUrl = 'mongodb://127.0.0.1:27017'
mongoose.connect(mongoUrl, { useMongoClient: true })
mongoose.Promise = global.Promise

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})