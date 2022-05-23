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
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
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
    padding: 80
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
    /*const styled_nav = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }*/


    return(
      <div>
        <div className='app__menu'>
          <Box sx={{ flexGrow: 1,
            minwidth: 1000,
            boxShadow: 1,
            background: '#fff',
            border: 'solid',
            borderWidth: 1,
            padding: 0.2, alignContent: 'center', justifyContent: 'center' }}>
            <AppBar style={{ background: '#fff', alignItems: 'center', justifyContent: 'center' }} position="static">
              <Toolbar>
                <Typography><a className = 'a' href="" onClick={toPage('home')} style={padding}>
              home
                </a>
                </Typography>
                <Typography><a className = 'a' href="" onClick={toPage('blogs')} style={padding}>
              blogs
                </a>
                </Typography>
                <Typography><a className = 'a' href="" onClick={toPage('users')} style={padding}>
              users
                </a>
                </Typography>
                {user
                  ? <div style={{ display: 'flex', justifyContent: 'space-between', padding: '30' }}>
                    <em className='loggedin'>{user.name} logged in</em>
                    <Stack spacing = { 2 } direction = "row">
                      <Button variant = "contained" onClick={handleLogout}> Logout </Button>
                    </Stack>
                  </div>
                  : <Link style={padding} to="/login">login</Link>
                }
              </Toolbar>
            </AppBar>
          </Box>
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