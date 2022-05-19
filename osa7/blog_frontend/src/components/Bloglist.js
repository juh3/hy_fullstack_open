import {  useDispatch, useSelector } from 'react-redux'
import BlogPosts from './BlogPosts'
import { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogReducer'

const Bloglist = () => {
  const dispatch = useDispatch()
  const blogs = useSelector( state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
    console.log('getting blogs')
  }, [dispatch])

  console.log(blogs, 'in bloglist')
  const array_tosort = [ ...blogs]
  return(
    <div>
      {array_tosort.sort(( a,b) => b.votes - a.votes).map(blog =>
        <div key = {blog.id}>
          <BlogPosts
            blog = {blog}
          />
        </div>
      )}
    </div>
  )
}

export default Bloglist