import { Link } from 'react-router-dom'
const BlogPosts = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (props === null) {
    return <p> Bloglist is empty</p>
  }
  return (
    <div style={blogStyle} className="blog">
      <div>
        <Link to={`/blogs/${props.blog.id}`}>
          {props.blog.title} {props.blog.author}{' '}
        </Link>
      </div>
    </div>
  )
}
export default BlogPosts
