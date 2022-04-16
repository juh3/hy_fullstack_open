const blogRouter = require('express').Router()
const Bloglist = require('../models/bloglist')
const logger = require('../utils/logger')


blogRouter.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p> ${date} </p>`)
  })

blogRouter.get('/', (request, response) => {
  logger.info('Trying to get collection from MongoDB')
  Bloglist
    .find({})
    .then(bloglist => {
      response.json(bloglist)
    })
    .catch((error) => {
      logger.error('Cant get')
    })
    
})

blogRouter.post('/', (request, response) => {
  const body = request.body
  if (body.author === undefined || body.title === undefined){
    return response.status(400).json({ error: 'content missing' })
  }
  
  const blog = new Bloglist(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch((error) => {
      logger.error('save unsuccessful')
    })
})

module.exports = blogRouter

