const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/user')
const usersRouter = express.Router()
const bodyParser = require('body-parser')
usersRouter.use(bodyParser.json())

const formatUser = (inputUser) => {
  return {
    id: inputUser.id,
    username: inputUser.username,
    name: inputUser.name,
    adult: inputUser.adult
  }
}

usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({})
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
    const saltRounds = 10
    const pwdHash = await bcrypt.hash(body.pw, saltRounds)

    //salasana ei näy JSONissa
    const newUser = new User({
      username: body.username,
      name: body.name,
      pwdHash,
      adult: body.adult
    })

    const savedUser = await newUser.save()
    res.json(savedUser)

  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'something went wrong' })
  }
})

module.exports = usersRouter
