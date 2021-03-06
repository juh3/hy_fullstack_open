import { useState } from 'react'

const BlogPosts = (props) => {

  console.log(props.blog)
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


  if (props.blog === null){
    return(
      <p> Bloglist is empty</p>
    )
  }
  return (
    <div style={blogStyle} className = 'blog'>
      <div style = {hideWhenVisible}>
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
        {props.user.username === props.blog.user.username && <button type = 'button' id ='delete-button'
          value = {props.blog.id} onClick = {props.handleDeletion}> remove </button>}
      </div>
    </div>
  )

}

export default BlogPosts