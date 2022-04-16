const Bloglist = require('../models/bloglist')

const initialBlogs = 
  [
    {
      author: "Test Olento", 
      id: "625566c5aa67033796983ac4", 
      number: 404, 
      title: "Testi Olennon blogi", 
      url: "http://www.testiolennongblogi.fi"
    }, 
  
    {
      author: "Lista Objekti",
      id: "6255674baa67033796983ac5",
      number: 123,
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