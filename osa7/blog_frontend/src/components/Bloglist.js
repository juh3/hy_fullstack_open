import {  useDispatch, useSelector } from 'react-redux'
import BlogPosts from './BlogPosts'
import { useEffect } from 'react'
import { initializeBlogs, removeBlog, upvote } from '../reducers/blogReducer'

const Bloglist = () => {
  const dispatch = useDispatch()
  const user = useSelector( state => state.users)
  const blogs = useSelector( state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
    console.log('getting blogs')
  }, [dispatch])

  const handleDeletion = async (event) => {
    const target_id = event.target.value
    const blog = blogs.find(n => n.id === target_id)
    if (window.confirm('Remove ' + blog.title + 'by ' + blog.author+ ' ?')){
      dispatch(removeBlog(blog,user))
    }
  }
  const handleFrontLike = (event) => {
    console.log('you liked this blog')
    console.log(event.target.value)
    const liked_blog_title = event.target.value
    const liked_blog_info = blogs.find(blog => blog.title === liked_blog_title)
    console.log(liked_blog_info)
    const new_likes = liked_blog_info.likes + 1
    const blogObject = { author: liked_blog_info.author, likes: new_likes, title: liked_blog_info.title, url: liked_blog_info.url, user: liked_blog_info.user.id }
    dispatch(upvote(liked_blog_info.id, blogObject))
  }

  console.log(blogs, 'in bloglist')
  const array_tosort = [ ...blogs]
  return(
    <div>
      {array_tosort.sort(( a,b) => b.votes - a.votes).map(blog =>
        <div key = {blog.id}>
          <BlogPosts
            blog = {blog}
            handleFrontLike = { (event) => handleFrontLike(event)}
            handleDeletion = { (event) => handleDeletion(event)}
          />
        </div>
      )}
    </div>
  )
}

export default Bloglist