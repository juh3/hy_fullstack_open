import { useDispatch, useSelector } from 'react-redux'
import { logoutuser } from '../reducers/userReducer'

const Logout = () => {
  const user = useSelector( state => state.users)
  const dispatch = useDispatch()
  const handleLogout = async (event) => {
    console.log(event)
    dispatch(logoutuser())
  }

  return(
    <p> {user.name} logged in <button type = "button" value = {user.id} onClick ={handleLogout} > Logout </button> </p>
  )
}

export default Logout