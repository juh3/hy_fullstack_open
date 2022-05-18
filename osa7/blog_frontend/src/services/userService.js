import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'



const getUserList = async() => {
  const request = await axios.get(baseUrl)
  return request.data
}

export default { getUserList }