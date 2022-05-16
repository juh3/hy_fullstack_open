import './App.css'
import { useEffect, useState, useRef } from 'react'
import blogService from './services/blogService'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogPosts from './components/BlogPosts'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'
import Bloglist from './components/Bloglist'
import { setNotification } from './reducers/notificationReducer'
import LoginForm from './components/LoginForm'
import Title from './components/Title'
import Logout from './components/Logout'
const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  console.log(blogs)




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


  /*const addBlog = (blogObject) => {
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
  }*/



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
      <Notification />
      <Title />
      { user === null && <LoginForm/>}

      { user !== null && <Logout/>}

      { user !== null && <Togglable buttonLabel = "add a new blog" ref = {blogFormRef}>
        <BlogForm />
      </Togglable>
      }

      {user !== null && <Bloglist/> }
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

    </div>
  )

}

export default App