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
import { Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import { initializeUserlist } from './reducers/allUsersReducer'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'

const Landingpage = ({ user, blogFormRef }) => {
  return(
    <div>

      { user !== null && <Togglable buttonLabel = "add a new blog" ref = {blogFormRef}>
        <BlogForm />
      </Togglable>
      }

      {user !== null && <Bloglist/>}
    </div>
  )
}

const UserView = () => {
  return(
    <div>
      <Users/>
    </div>)
}

const BlogView = () => (
  <SingleBlog/>
)


const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const user = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getUser())
    dispatch(initializeUserlist())
  }, [dispatch])

  return(
    <div>
      <Notification/>
      <Title/>
      { user === null && <LoginForm/>}

      { user !== null && <Logout/>}
      <Routes>
        <Route path = '/' element = { <Landingpage user = {user} blogFormRef = {blogFormRef} />} />
        <Route path = '/users' element = { <UserView/> } />
        <Route path = '/users/:id' element = { <SingleUser />} />
        <Route path = '/blogs/:id' element = { <BlogView />} />
      </Routes>
    </div>
  )

}

export default App