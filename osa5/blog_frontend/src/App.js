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
      .then(initialBlogs => {
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

  const handleDeletion = async (event) => {
    const target_id = event.target.value
    const blog = blogs.find(n => n.id === target_id)
    if (window.confirm('Remove ' + blog.title + 'by ' + blog.author+ ' ?')){
      try{
        blogService
          .redact(blog.id, user.token)
        const updatedBlogs = blogs.filter(n => n.id !== blog.id)
        setBlogs(updatedBlogs)
        setNotification({ text:`Successfully deleted ${blog.title}`,
          type:'success' })
        setTimeout( () => {
          setNotification(null)
        },5000)

      }catch(exception){
        setNotification({ text: 'Remove failed, try again', type: 'failure' })
        setTimeout( () => {
          setNotification(null)
        },5000)
      }
    }
  }


  const handleLogout = async (event) => {
    console.log(event)
    window.localStorage.clear()
    setUser(null)
    setNotification( { text: 'Logged out succesfully', type: 'success' })
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
      setNotification({ text: 'Login successful', type: 'success' })
      setTimeout( () => {
        setNotification(null)
      },5000)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({ text:'wrong credentials',
        type: 'failure' })

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
        setNotification({ text: 'Blog added succesfully',
          type: 'success' })
        setTimeout( () => {
          setNotification(null)
        }, 5000)
      })

      .catch( (error) => {
        setNotification({ text: error.response.data.error, type: 'failure' })
        setTimeout( () => {
          setNotification(null)
        }, 5000)
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

  const handleFrontLike = (event) => {
    console.log('you liked this blog')
    console.log(event.target.value)
    const liked_blog_title = event.target.value
    const liked_blog_info = blogs.find(blog => blog.title === liked_blog_title)
    console.log(liked_blog_info)
    const new_likes = liked_blog_info.likes + 1
    const blogObject = { author: liked_blog_info.author, likes: new_likes, title: liked_blog_info.title, url: liked_blog_info.url, user: liked_blog_info.user.id }
    blogService
      .like(liked_blog_info.id, blogObject )
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== liked_blog_info.id ? blog :returnedBlog))
        setNotification({ text: 'You liked '+ liked_blog_title, type: 'success' })
        setTimeout( () => {
          setNotification(null)
        },5000)
      })
      .catch( error => {
        console.log(error)
        setNotification({ text:'Encountered an issue, your like wasnt reqistered', type: 'failure' })
      })
  }

  return(
    <div>
      <Notification message = {notification} />
      <h1> The BLOG </h1>
      <p> Welcome to the site that shows the best blogs online!</p>

      { user === null && <div> {loginForm()} </div> }

      { user !== null && <p> {user.name} logged in <button type = "button" value = {user.id} onClick ={handleLogout} > Logout </button> </p>}

      { user !== null && <Togglable buttonLabel = "add a new blog" ref = {blogFormRef}>
        <FormBlog createBlog = {addBlog} blogs = {blogs} />
      </Togglable>
      }

      {user !== null &&
      <div>
        <ul className = "first-ul">
          {blogs.sort( (a,b) => b.likes - a.likes).map(blog => (
            <li key = {blog.author}>
              <BlogPosts
                blog = {blog}
                handleFrontLike = { (event) => handleFrontLike(event)}
                handleDeletion = { (event) => handleDeletion(event)}
                user = {user} />
            </li>
          ))}
        </ul>

      </div>
      }

    </div>
  )

}

export default App