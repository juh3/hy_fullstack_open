import './App.css'
import BlogPosts from './components/BlogPosts'
import { useEffect, useState } from 'react'
import blogService from './services/blogService'
import FormBlog from './components/addblog'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newUrl, setUrl] = useState("")
  const [newLikes, setLikes] = useState("")
  const [newAuthor, setAuthor] = useState("")
  const [newTitle, setTitle] = useState("")

  const hook = () => {
    console.log('effect')
    blogService
    .getAll()
    .then(initialBlogs =>{
      setBlogs(initialBlogs)
    })
    
  }

  useEffect(hook,[])

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
        
      })
      .catch( (error) => {
        console.log(error.response.data)
      })
    console.log(`Added ${newAuthor}s blog`)
    setAuthor("")
    setTitle("")
    setLikes("")
    setUrl("")
  }
    

  return(
    <div>
      <h1> The BLOG </h1>
      <p> Welcome to the site that shows the best blogs online!</p>
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
      <BlogPosts blogs = {blogs} />
    </div>
  )

}

export default App;
