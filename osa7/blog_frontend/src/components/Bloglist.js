import {  useSelector } from 'react-redux'


const Bloglist = () => {
  const blogs = useSelector( state => state.blogs)
  console.log(blogs, 'in bloglist')
  const array_tosort = [ ...blogs]

  return(
    <div>
      {array_tosort.sort(( a,b) => b.votes - a.votes).map(blog =>
        <div key = {blog.id}>
          <div>
            {blog.title} {blog.author}
          </div>
        </div>
      )}
    </div>
  )
}

export default Bloglist