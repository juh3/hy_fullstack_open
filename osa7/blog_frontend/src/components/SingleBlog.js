import { useMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeBlog, upvote } from '../reducers/blogReducer'
const SingleBlog = () => {
  const blogs = useSelector( state => state.blogs)
  const user = useSelector( state => state.users)
  const dispatch = useDispatch()
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  console.log(blog)


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

  if (!blog) {
    return(
      <p> Loading blog </p>
    )
  }
  return(
    <div>
      <h1> {blog.title} {blog.author} </h1>
      <p>{blog.url}</p>
      <p> likes: {blog.likes}
        <button type = "button" id = 'button-like' value = {blog.title} onClick = {handleFrontLike}> like </button>
      </p>
      <p> added by {blog.user.name}</p>
      {user.username === blog.user.username && <button type = 'button' id ='delete-button'
        value = {blog.id} onClick = {handleDeletion}> remove </button>}
    </div>
  )
}


export default SingleBlog