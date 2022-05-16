import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Logout = () => {

  const dispatch = useDispatch()
  const handleLogout = async (event) => {
    console.log(event)
    window.localStorage.clear()
    setUser(null)
    dispatch(setNotification('Logged out succesfully', 5))

  }

  return(
    <p> {user.name} logged in <button type = "button" value = {user.id} onClick ={handleLogout} > Logout </button> </p>
  )
}

export default Logout