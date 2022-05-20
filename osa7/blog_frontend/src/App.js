import './App.css'
import { useEffect , useRef, useState } from 'react'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { getUser, logoutuser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import Title from './components/Title'
import Bloglist from './components/Bloglist'
import { Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import { initializeUserlist } from './reducers/allUsersReducer'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'
import LoginForm from './components/LoginForm'

const Landingpage = ({ user, blogFormRef }) => {
  return(
    <div>

      { user !== null && <Togglable buttonLabel = "add a new blog" ref = {blogFormRef}>
        <BlogForm />
      </Togglable>
      }
    </div>
  )
}

const UserView = () => (
  <Users/>
)

const BlogView = () => (
  <SingleBlog/>
)


const App = () => {
  const [page, setPage] = useState('home')

  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const user = useSelector(state => state.users)

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const padding = {
    padding: 5
  }

  const content = () => {
    if(page === 'blogs') {
      return(
        <Bloglist/>
      )
    }
    if(page === 'users') {
      return(
        <Users/>
      )
    }
    if(page === 'home') {
      return(
        <div>
          <Title/>
        </div>
      )
    }
  }

  const handleLogout = async (event) => {
    console.log(event)
    dispatch(logoutuser())
  }

  const Navigation = () => {
    const styled_nav = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }


    return(
      <div>
        <div style = {styled_nav}>
          <a href="" onClick={toPage('home')} style={padding}>
            home
          </a>
          <a href="" onClick={toPage('blogs')} style={padding}>
            blogs
          </a>
          <a href="" onClick={toPage('users')} style={padding}>
            users
          </a>
          {user
            ? <em>{user.name} logged in <button onClick={handleLogout}> Logout </button></em>
            : <Link style={padding} to="/login">login</Link>
          }
        </div>
        {content()}
      </div>
    )
  }
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getUser())
    dispatch(initializeUserlist())
  }, [dispatch])

  return(
    <div>
      <Notification/>
      <Navigation/>

      <Routes>
        <Route path = '/' element = { <Landingpage user = {user} blogFormRef = {blogFormRef} />} />
        <Route path = '/users' element = { <UserView/> } />
        <Route path = '/users/:id' element = { <SingleUser />} />
        <Route path = '/blogs/:id' element = { <BlogView />} />
        <Route path = '/login' element = {<LoginForm blogFormRef = {blogFormRef} />} />
      </Routes>
    </div>
  )

}

export default App