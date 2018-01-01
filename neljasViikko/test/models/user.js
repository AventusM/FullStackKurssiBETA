const mongoose = require('mongoose')

const User = mongoose.model('User', {
  username: String,
  name: String,
  pw: String,
  pwdHash: String,
  adult: Boolean,
  //Jokaisella käyttäjällä henkilökohtainen blogitaulukko
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

module.exports = User