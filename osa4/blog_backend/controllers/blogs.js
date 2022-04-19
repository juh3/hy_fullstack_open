const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Bloglist = require('../models/bloglist')
const logger = require('../utils/logger')
const User = require('../models/user')

/*const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}*/

blogsRouter.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p> ${date} </p>`)
  })

blogsRouter.put('/:id', (request,response) => {
  const id = request.params.id
  const{ author, title, likes, url } = request.body

  Bloglist.findByIdAndUpdate(id,{ author,title, likes, url },
    { new:true, runValidators: true, context: 'query' }
  )
    .then(updatedEntry => {
      if(updatedEntry){
        response.json(updatedEntry)
      }else{
        response.status(400).end()
      }
    })
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Bloglist
    .find({})
    .populate('user', {username: 1, name: 1})
  
    if (blogs){
      response.json(blogs)
    }else{
      logger.error('Cant get data from MONGODB')
    }
})


blogsRouter.get('/:id', (request,response) => {
  Bloglist.findById(request.params.id).then(entry => {
    if (entry){
      response.json(entry)
    } else{
      response.status(404).end()
    }
  })
})

blogsRouter.delete('/:id', (request,response) => {
  const id = request.params.id
  Bloglist.findByIdAndDelete(id)
    .then(
      response.status(204).end()
    )
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if (body.author === undefined || body.title === undefined){
    return response.status(400).json({ error: 'content missing' })
  }

  const user = await User.findById(decodedToken.id) 

  /*const blog = new Bloglist(request.body)*/
  
  const blog = new Bloglist({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id

  })

  /*blog
    .save()
    .then(result => {
      if(result){
      response.status(201).json(result)
    }
    else{
      logger.error('save unsuccessful')
    }
  })*/
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)

})

module.exports = blogsRouter