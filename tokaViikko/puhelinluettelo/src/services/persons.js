import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
}

const remove = (id) => {
    return axios.delete(baseUrl + '/' + id)
}

const update = (id, newPerson) => {
    return axios.put(baseUrl + '/' + id, newPerson)
}

export default { getAll, create, remove, update }