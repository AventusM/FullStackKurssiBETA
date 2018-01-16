import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const createBlog = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const res = await axios.post(baseUrl, newObject, config)
  console.log('createBlog', res)
  return res.data
}

const updateBlog = (id, newObject) => {
  //await ei ehkä tarpeellinen -> katso matsku .. ?
  //antaa tosiaan failed to compile errorin ???
  const result = axios.put(`${baseUrl}/${id}`, newObject)
  return result // jos laittaa thenin tänne niin res => res.config, ei res.data (itellä siis)
}

//await - async?
const deleteBlog = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const result = await axios.delete(`${baseUrl}/${id}`, config)
  return result
}

const updateBlogComments = async (id, updatedBlog) => {
  const result = await axios.put(`${baseUrl}/${id}/comments`, updatedBlog)
  return result.config
}

export default { getAll, createBlog, updateBlog, setToken, deleteBlog, updateBlogComments }