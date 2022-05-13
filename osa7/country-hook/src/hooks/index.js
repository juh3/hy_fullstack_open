import { useEffect, useState } from "react"
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`
  
  useEffect(() => {
    const get_data = async() => {
      if (name !== '') {
        await axios
          .get(url)
          .then(response => {
            setCountry(response.data[0])
          })
          .catch(() => {
            setCountry(false)
          })
      }
    } 
    get_data()
      }, [name,url])
    
    
   return country
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