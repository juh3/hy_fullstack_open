const Bloglist = require('../models/bloglist')
const User = require('../models/user')

const initialBlogs = 
  [
    {
      author: "Test Olento", 
      likes: 404, 
      title: "Testi Olennon blogi", 
      url: "http://www.testiolennongblogi.fi",
      id: "625ada3d2e0c4a066b4867f6",
    }, 
  
    {
      author: "Lista Objekti",
      likes: 123,
      title: "testauksen iloa",
      url: "http//:www.ilonatestauksessa.fi"
    }
]


const blogsInDb = async () => {
  const blogs = await Bloglist.find({})
  return blogs.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  blogsInDb, 
  initialBlogs,
  usersInDb,
}