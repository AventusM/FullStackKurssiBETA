const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/user')
const usersRouter = express.Router()
const bodyParser = require('body-parser')
usersRouter.use(bodyParser.json())

//ERITYISESTI GET - OPERAATIOTA VARTEN
const formatUser = (inputUser) => {
  return {
    id: inputUser.id,
    username: inputUser.username,
    name: inputUser.name,
    adult: inputUser.adult,
    blogs: inputUser.blogs,
    //SALASANA LOGININ TESTAAMISEEN
    //SALASANA LOGININ TESTAAMISEEN
    //SALASANA LOGININ TESTAAMISEEN
    pw: inputUser.pw
  }
}

usersRouter.get('/', async (req, res) => {
  try {
    //blogs - kentässä id:n sijasta varsinainen sisältö
    //Filtteröidään __V ja user (duplikaatti, huomataan siitä kuitenkin yhteys) pois
    //Vastaavasti voi laittaa 1 juuri siihen kenttään mikä halutaan nähdä
    //näin tehty blogsRouterissa
    //ref --> blog ===> mongoose tietää mitä populate tekee
    //halutaan 'populoida' blogs - kenttä
    const users = await User.find({}).populate('blogs', { __v: 0, user: 0 })
    res.json(users.map(formatUser))
  } catch (exception) {
    console.log(exception)
    res.status(400).json({ error: 'bad request' })
  }
})

//Tietokantaan talletetaan salasanan hash pyynnön mukana tulleen
//salasanan sijasta
usersRouter.post('/', async (req, res) => {
  try {
    const body = req.body
    console.log('attempt ---> user: ' + body.username + ' --- pw: ' + body.pw)

    const duplicate = await User.find({ username: body.username })
    if (duplicate.length > 0) {
      return res.status(409).json({ error: 'duplicate username found' })
    } else if (body.username.length < 3 || body.pw.length < 3) {
      return res.status(400).json({ error: 'username and/or password too short' })
    }
    console.log('success')
    const saltRounds = 10
    const pwdHash = await bcrypt.hash(body.pw, saltRounds)
    console.log(pwdHash)

    //salasana ei näy JSONissa
    const newUser = new User({
      username: body.username,
      name: body.name,
      //Luukkainen unohtanut kentän vissiin
      pw: pwdHash,
      adult: body.adult || true
    })

    const savedUser = await newUser.save()
    res.json(savedUser)

  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'something went wrong' })
  }
})

module.exports = usersRouter
