const Bloglist = require('../models/bloglist')

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

module.exports = {
  blogsInDb, initialBlogs
}