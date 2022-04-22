import './App.css'
import { useEffect, useState, useRef } from 'react'
import blogService from './services/blogService'
import FormBlog from './components/addblog'
import Signin from './components/Signin'
import loginService from './services/loginService'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogPosts from './components/BlogPosts'

const App = () => {

  
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword]= useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  const hook = () => {
    console.log('effect')
    blogService
    .getAll()
    .then(initialBlogs =>{
      setBlogs(initialBlogs)
    })
    
  }

  useEffect(hook,[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  console.log(blogs)


  const handlePasswordChange = (event) => {
    console.log(event.target.value)
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value)
  }

  /*const handleDeletion = (event) =>{
    console.log("Pressed  delete button")
    console.log("Entry to be deleted",event.target.value)
    const target_id = event.target.value

    const blog = blogs.find(n => n.id === target_id)
    if (window.confirm("Delete " + blog.title + " ?")){
      blogService
      .redact(blog.id)
      const updatedBlogs = blogs.filter(n => n.id !== blog.id)
      setBlogs(updatedBlogs)
      setNotification({text:`Successfully deleted ${blog.title}`,
      type:"success"})
      setTimeout(() =>{
        setNotification(null)
      },5000)
      
      
    }
  }*/


  
  const handleLogout = async (event) => {
    console.log('Trying to logout')
    window.localStorage.clear()
    setUser(null)
    setNotification( {text: 'Logged out succesfully', type: "success"})
    setTimeout( () => {
      setNotification(null)
    },5000)

  } 
  
  const handleLogin = async (event) => {
    event.preventDefault()  

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setNotification({text: 'Login successful', type: 'success'})
      setTimeout( () => {
        setNotification(null)
      },5000)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({text:'wrong credentials',
        type: "failure"})

      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNotification({text: 'Blog added succesfully',
      type: "success"})
      setTimeout( () => {
      setNotification(null)
      }, 5000)
      
      })
    .catch( (error) => {
    console.log(error.response.data)
    setNotification({text: error.response.data.error, type: 'failure'})
    })
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return(
      <div>
        <div style = {hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}> log in </button>
      </div>

      <div style = {showWhenVisible}>
        <Signin 
          handlePasswordChange = {(event) => handlePasswordChange(event)}
          handleUsernameChange = {(event) => handleUsernameChange(event)}
          handleLogin = {(event) => handleLogin(event)}
          password = {password}
          username = {username}
          />
        <button onClick={() => setLoginVisible(false)}> cancel </button>
      </div>
      </div>
    )
  }


  return(
    <div>
      <Notification message = {notification} />
      <h1> The BLOG </h1>
      <p> Welcome to the site that shows the best blogs online!</p>
      
      { user === null && <p> {loginForm()} </p> }
    
      { user !== null && <p> {user.name} logged in <button type = "button" value = {user.id} onClick ={handleLogout} > Logout </button> </p>}

      { user !== null && <Togglable buttonLabel = "add a new blog" ref = {blogFormRef}>
        <FormBlog createBlog = {addBlog} blogs = {blogs} />
      </Togglable>
      } 

    <div>
    <ul className = "first-ul">
      {blogs.map(blog => (
        <li key = {blog.author}>
        <BlogPosts 
          blog = {blog}/>
        </li>
      ))}
        </ul>

    </div>
  </div>
  )

}

export default App;
