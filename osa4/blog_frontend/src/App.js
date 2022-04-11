import './App.css'
import BlogPosts from './components/BlogPosts'
import { useEffect, useState } from 'react'
import blogService from './services/blogService'

const App = () => {
  const [blogs, setBlogs] = useState([])

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

  return(
    <div>
      <h1> The BLOG </h1>
      <p> Welcome to the site that shows the best blogs online!</p>
      <BlogPosts blogs = {blogs} />
    </div>
  )

}

export default App;
