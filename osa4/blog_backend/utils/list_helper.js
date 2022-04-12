var _ = require('lodash');


const dummy = (blogs) => {
  return(
    1
  )
}

const totalLikes = (blogs) => {
  var amountoflikes = blogs.map(blog => blog.likes)
    .reduce((sum, blog) => sum + blog ,0)
  return amountoflikes
}

const favoriteBlog = (blogs) => {
  var mostvotes = blogs.map(blog => blog.likes)
    .reduce((prev, blog) => {
        return prev > blog ? prev : blog
    })
  return blogs.map(blog => blog).find(blog => blog.likes === mostvotes)
}

const mostBlogs = (blogs) => {
  
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}