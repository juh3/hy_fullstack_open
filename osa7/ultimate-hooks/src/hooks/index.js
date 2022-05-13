import { useState } from "react"
import axios from 'axios'

export const useResource = (url) => {
    const [resources, setResources] = useState([])

    const getAll = () => {
      const request = axios.get(url)
      return request.then(response => setResources(response.data))
    }
  
    const create = async (resource) => {
      const response = await axios.post(url, resource)
      setResources([...resources, response.data])
    }
  
    const service = {
      create,
      getAll
    }
  
    return [
      resources, service
    ]
  }


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}