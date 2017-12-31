const mongoose = require('mongoose')

const User = mongoose.model('User', {
  username: String,
  name: String,
  pw: String,
  adult: Boolean
})

module.exports = User