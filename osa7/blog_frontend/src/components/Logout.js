import { useDispatch, useSelector } from 'react-redux'
import { logoutuser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Logout = () => {
  const user = useSelector( state => state.users)
  const dispatch = useDispatch()
 
  const padding = {
    padding: 5
  }


  return(
    <p>
      {user
        ? <div><em>{user.name} logged in</em> <button onClick={handleLogout}> Logout </button></div>
        : <Link style={padding} to="/login">login</Link>
      }
    </p>
  )
}

export default Logout