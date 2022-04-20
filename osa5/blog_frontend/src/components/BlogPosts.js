

const BlogPosts = ({blogs, handleDeletion}) => {
  console.log("Trying to render blogs")
  console.log(blogs)
  if (blogs === null){
    return(
      <p> Bloglist is empty</p>
    )
  }
  return (
    <ul>

      {blogs.map(blog => 
        <li key = {blog.author}>
          Blog name: &nbsp; &nbsp; "{blog.title}" &nbsp; by &nbsp; {blog.author}. &nbsp;&nbsp;
          Upvotes: {blog.likes}&nbsp;&nbsp;&nbsp;  
          Website:&nbsp; {blog.url} &nbsp; &nbsp;
          <button type = "button" value = {blog.id} onClick ={handleDeletion} > delete </button>
        </li>
        )}
    </ul>
  )

}

export default BlogPosts;