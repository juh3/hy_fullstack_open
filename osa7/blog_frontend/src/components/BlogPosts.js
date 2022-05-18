import { useState } from 'react'
import { useSelector } from 'react-redux'

const BlogPosts = (props) => {
  const user = useSelector(state => state.users)
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  /*const handleFrontLike = (event) => {
    console.log('you liked this blog')
    console.log(event.target.value)
    const liked_blog_title = event.target.value
    const liked_blog_info = blogs.find(blog => blog.title === liked_blog_title)
    console.log(liked_blog_info)
    const new_likes = liked_blog_info.likes + 1
    const blogObject = { author: liked_blog_info.author, likes: new_likes, title: liked_blog_info.title, url: liked_blog_info.url, user: liked_blog_info.user.id }
    dispatch(upvote(liked_blog_info.id, blogObject))
  }*/


  if (props === null){
    return(
      <p> Bloglist is empty</p>
    )
  }

  return (
    <div style={ blogStyle } className = 'blog'>
      <div style = { hideWhenVisible }>
        {props.blog.title} {props.blog.author}
        <button type = 'button' id = 'view-button' onClick = {toggleVisibility}> view </button>
      </div>

      <div style = {showWhenVisible}>
        {props.blog.title} {props.blog.author}
        <button type = 'button' onClick = {toggleVisibility}> hide </button>
        <p>{props.blog.url}</p>
        <p> likes: {props.blog.likes}
          <button type = "button" id = 'button-like' value = {props.blog.title} onClick = {props.handleFrontLike}> like </button>
        </p>
        <p> {props.blog.user.name}</p>
        {user.username === props.blog.user.username && <button type = 'button' id ='delete-button'
          value = {props.blog.id} onClick = {props.handleDeletion}> remove </button>}
      </div>
    </div>
  )
}
export default BlogPosts