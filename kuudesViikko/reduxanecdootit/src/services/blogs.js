import axios from 'axios'
const url = 'http://localhost:3001/anecdotes'

const getAllBlogs = async () => {
  const res = await axios.get(url)
  return res.data
}

const createNewBlog = async (content) => {
  const res = await axios.post(url, { content, votes: 0 })
  return res.data
}

export default { getAllBlogs, createNewBlog }