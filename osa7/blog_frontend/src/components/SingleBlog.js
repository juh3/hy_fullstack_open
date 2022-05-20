import { useMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { dispatchComment, removeBlog, upvote } from '../reducers/blogReducer'
const SingleBlog = () => {
  const [comment, setComment] = useState('')
  const blogs = useSelector( state => state.blogs)
  const user = useSelector( state => state.users)
  const dispatch = useDispatch()
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  console.log(blog)


  const handleDeletion = async (event) => {
    console.log('trying to delete')
    const target_id = event.target.value
    const blog = blogs.find(n => n.id === target_id)
    if (window.confirm('Remove ' + blog.title + 'by ' + blog.author+ ' ?')) {
      console.log('confirmed', blog, blog.id, user)

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

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()
    dispatch(dispatchComment(blog, blog.id , comment))
    setComment('')
  }
  if (!blog) {
    return(
      <p> Loading blog </p>
    )
  }
  console.log(blog.comments)
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
      <div>
        <h2> Comments</h2>
        <form onSubmit = {addComment}>
          <div>
            comment: <input
              id = 'comment'
              value = {comment}
              onChange = {handleCommentChange}
            />
            <button type = 'submit'> add comment</button>
          </div>
        </form>
        <ul>
          {blog.comments.map(comment => (
            <li key = {comment}>
              {comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


export default SingleBlog