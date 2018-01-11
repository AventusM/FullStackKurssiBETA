import axios from 'axios'
const url = 'http://localhost:3001/anecdotes'

const getAllAnecdotes = async () => {
  const res = await axios.get(url)
  return res.data
}

const createNewAnecdote = async (content) => {
  const res = await axios.post(url, { content, votes: 0 })
  return res.data
}

const updateExistingAnecdote = async (id, anecdote) => {
  console.log(`${url}/${id}`)
  const res = await axios.put(`${url}/${id}`, { ...anecdote, votes: anecdote.votes + 1 })
  // console.log('services, res.data', res.data)
  return res.data
}

export default { getAllAnecdotes, createNewAnecdote, updateExistingAnecdote }