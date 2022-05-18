import { initializeUserlist } from '../reducers/allUsersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  const userlist = useSelector( state => state.allUsers)
  useEffect(() => {
    dispatch(initializeUserlist())
  }, [dispatch])

  const padding = {
    paddingLeft: 160,
    fontWeight: 'bold'
  }

  if (userlist === null) {
    return(
      <p> No Data </p>
    )
  }

  return(
    <div>
      <h1> Users </h1>
      <p  style = {padding} > Blogs created</p>
      <ul className='first-ul'>
        {userlist.map(user =>
          <li key = {user.id}>
            <Link to = { `/users/${user.id}`}> {user.name} </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {user.blogs.length}
          </li>
        )}
      </ul>
    </div>
  )

}
export default Users