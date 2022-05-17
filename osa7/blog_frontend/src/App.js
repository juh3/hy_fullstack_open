import './App.css'
import { useEffect , useRef } from 'react'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { getUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import Title from './components/Title'
import Logout from './components/Logout'
import Bloglist from './components/Bloglist'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const user = useSelector(state => state.users)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect( () => {
    dispatch(getUser())
  }, [])

  return(
    <div>
      <Notification />
      <Title />
      { user === null && <LoginForm/>}

      { user !== null && <Logout/>}

      { user !== null && <Togglable buttonLabel = "add a new blog" ref = {blogFormRef}>
        <BlogForm />
      </Togglable>
      }

      {user !== null && <Bloglist/>}

    </div>
  )

}

export default App