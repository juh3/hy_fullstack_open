const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Bloglist = require('../models/bloglist')
const logger = require('../utils/logger')
const User = require('../models/user')

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

blogsRouter.delete('/:id', async (request,response) => {
  const id = request.params.id
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Bloglist.findById(id)
  const user = await User.findById(decodedToken.id)

  if ( blog.user.toString() === user._id.toString() ){
    await Bloglist.findByIdAndRemove(id)
    return response.status(204).end()
  } 
  else{
    return response.status(401).json({error: 'You cant delete a blog you havent posted.'})
  }

})

blogsRouter.post('/', async (request, response) => {
  const { body } = request
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
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
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())

})

module.exports = blogsRouter