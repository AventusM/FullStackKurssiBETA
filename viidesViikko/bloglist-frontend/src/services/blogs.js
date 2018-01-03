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
  return res.data
}

const updateBlog = (id, newObject) => {
  //await ei ehkä tarpeellinen -> katso matsku .. ?
  //antaa tosiaan failed to compile errorin ???
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  return req // jos laittaa thenin tänne niin res => res.config, ei res.data (itellä näin)
}

//await - async?
const deleteBlog = async (id, objectToDelete) => {
  const req = await axios.delete(`${baseUrl}/${id}`, objectToDelete)
  return req.then(res => res.data)
}

export default { getAll, createBlog, updateBlog, setToken }