const blogsRouter = require('express').Router()
const Bloglist = require('../models/bloglist')
const logger = require('../utils/logger')


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

blogsRouter.get('/', (request, response) => {
  logger.info('Trying to get collection from MongoDB')
  Bloglist
    .find({})
    .then(bloglist => {
      if(bloglist){
      response.json(bloglist)
      }else{
        logger.error('Cant get collection from MONGODB')
      }
    })
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

blogsRouter.post('/', (request, response) => {
  const body = request.body
  if (body.author === undefined || body.title === undefined){
    return response.status(400).json({ error: 'content missing' })
  }

  const blog = new Bloglist(request.body)

  blog
    .save()
    .then(result => {
      if(result){
      response.status(201).json(result)
    }
    else{
      logger.error('save unsuccessful')
    }
  })
})

module.exports = blogsRouter