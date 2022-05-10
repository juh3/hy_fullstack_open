import { doFilter } from '../reducers/filterReducer'
import {  useDispatch } from 'react-redux'

const Filter = () => {
  const handleChange = (event) => {
    event.preventDefault()
    dispatch(doFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  const dispatch = useDispatch()

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter