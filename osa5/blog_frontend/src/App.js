import './App.css'
import BlogPosts from './components/BlogPosts'
import { useEffect, useState } from 'react'
import blogService from './services/blogService'
import FormBlog from './components/addblog'
import Signin from './components/Signin'
import loginService from './services/loginService'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newUrl, setUrl] = useState('')
  const [newLikes, setLikes] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newTitle, setTitle] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword]= useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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

  const handleUrlChange = (event) =>{
    console.log(event.target.value)
    setUrl(event.target.value)
  }
  const handleTitleChange = (event) =>{
    console.log(event.target.value)
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) =>{
    console.log(event.target.value)
    setAuthor(event.target.value)
  }
  const handleLikesChange = (event) => {
    console.log("like")
    console.log(event.target.value)
    setLikes(event.target.value)
  }

  const handlePasswordChange = (event) => {
    console.log(event.target.value)
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value)
  }

  const handleDeletion = (event) =>{
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
  }


  const addBlog = (event) => {
    event.preventDefault()
    console.log('trying to add a blog')
    
    const blogObject = {
      author: newAuthor,
      title: newTitle,
      likes: newLikes,
      url: newUrl,
      id: blogs.length + 1

    }
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
    console.log(`Added ${newAuthor}s blog`)
    setAuthor('')
    setTitle('')
    setLikes('')
    setUrl('')
  }

  const handleLogout = async (event) => {
    console.log('Trying to logout')
    window.localStorage.clear()

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

  return(
    <div>
      <Notification message = {notification} />
      <h1> The BLOG </h1>
      <p> Welcome to the site that shows the best blogs online!</p>

      { user === null && <p> Log in below!</p> }

      { user !== null && <p> {user.name} logged in <button type = "button" value = {user.id} onClick ={handleLogout} > Logout </button> </p>}
      { user === null &&
        <Signin 
          handlePasswordChange = {(event) => handlePasswordChange(event)}
          handleUsernameChange = {(event) => handleUsernameChange(event)}
          handleLogin = {(event) => handleLogin(event)}
          password = {password}
          username = {username}
        />
      }

      { user !== null &&
        <FormBlog 
        handleAuthorChange = {(event) => handleAuthorChange(event)} 
        handleLikesChange = {(event) => handleLikesChange(event)}
        handleTitleChange = {(event) => handleTitleChange(event)}
        handleUrlChange = {(event) => handleUrlChange(event)}
        onSubmit = {(event) => {addBlog(event)}}
        author = {newAuthor}
        likes = {newLikes}
        title= {newTitle}
        url = {newUrl}
        />
      }

      { user !== null &&
      <BlogPosts blogs = {blogs}
        handleDeletion = {(event) => handleDeletion(event)} 
      />
    
      }
    </div>
  )

}

export default App;
