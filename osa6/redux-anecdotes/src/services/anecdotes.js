import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anecdote) => {
  const object = { content: anecdote, votes: 0 }
  console.log(object, 'this is the object in the backend')
  const response = await axios.post(baseUrl,object)
  console.log(response.data, 'this is the response from post request')
  return response.data

}
export default { 
  getAll,
  createNew,
}