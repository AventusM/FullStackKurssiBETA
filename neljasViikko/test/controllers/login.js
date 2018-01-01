//var?
var jsonWebToken = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const bodyParser = require('body-parser')
loginRouter.use(bodyParser.json())


loginRouter.post('/', async (req, res) => {
  const body = req.body
  const foundUser = await User.findOne({ username: body.username })
  console.log(body.pw)
  console.log(foundUser.pwdHash) // UNDEFINED
  const pwCorrect =
    foundUser === null ?
      false :
      //foundUser.pwdHash - suoritus oli hieman outo users.js - tiedostossa. Saattaa
      //aiheuttaa bugeja
      await bcrypt.compare(body.pw, foundUser.pw)

  //Tarkistetaan, että käyttäjä löytynyt ja salasanat täsmäävät
  if (!(foundUser && pwCorrect)) {
    return res.status(401).send({ error: 'invalid foundUser or pass' })
  }

  // (nyt kirjautunut) Käyttäjä, joka saa yksilöivän tokenin
  const userGettingTheToken = {
    username: foundUser.username,
    id: foundUser._id // Saattaa olla pelkkä id
  }

  //Mikä on SECRETin arvo?
  const signedToken = jsonWebToken.sign(userGettingTheToken, process.env.SECRET)
  res.status(200).send({ signedToken, username: foundUser.username, name: foundUser.name })
})

//Ei objektimuodossa
module.exports = loginRouter