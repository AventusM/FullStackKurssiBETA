const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogData = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f1',
    title: 'Russian food',
    author: 'AntonM',
    url: '',
    likes: 1,
    __v: 0
  }
]

//Muutetaan yhden testin toiminnallisuuteen (pelkästään)
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs
}

const usersInDb = async () => {
  const users = await User.find({})
  return users
}

module.exports = {
  initialBlogData, blogsInDb, usersInDb
}