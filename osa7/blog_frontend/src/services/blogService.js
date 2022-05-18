import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/bloglists'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const redact = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios
    .delete(`${baseUrl}/${id}`, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
}

const like = (id , newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}


export default { getAll, create, redact, setToken, update, like }