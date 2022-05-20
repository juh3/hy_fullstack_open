const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bloglist = require('../models/bloglist')

const Bloglist = require('../models/bloglist')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

router.get('/', async (request, response) => {
  const notes = await Bloglist
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(notes)
})

router.get('/:id', (request,response) => {
  Bloglist.findById(request.params.id).then(entry => {
    if (entry){
      response.json(entry)
    } else{
      response.status(404).end()
    }
  })
})
router.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ text: 'token missing or invalid', type: 'failure' })
  }

  const user = request.user
  const blog = new Bloglist({ ...request.body, user: user.id })   

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})


router.delete('/:id', async (request,response) => {
  const id = request.params.id
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  /*if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }*/
  if(!decodedToken){
    return response.status(401).json({error:'token missing or invalid'})
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

router.put('/:id', async (request, response) => {
  const blog = request.body
  const { id } = request.params
  console.log(blog, 'this is the blog passed to the backend')
  const updatedBlog = await Bloglist
    .findByIdAndUpdate(
      request.params.id, 
      blog, 
      { new: true, runValidators: true, context: 'query' }
    )
  console.log(updatedBlog, 'this is the updatedblog in backend')
  response.json(updatedBlog)
})

router.post('/:id/comments', async(request, response) => {
  const { id } = request.params
  const comment = request.body 

  const updatedBlog = await Bloglist.findById(id)

  const updatedComments = updatedBlog.comments.concat(comment)
  const savedBlog = await Bloglist.findByIdAndUpdate(id,
    { ...updatedBlog, comments: updatedComments},
    { new: true, runValidators: true, context: 'query' }
    )
  response.json(savedBlog)
})

router.get('/:id/comments', async(request,response) => {
  Bloglist.findById(request.params.id).then(entry => {
    if (entry.comments){
      response.json(entry.comments)
    } else{
      response('<p>You are in the comments page</p>')
    }
  })
})
module.exports = router