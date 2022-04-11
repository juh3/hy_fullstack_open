require('dotenv').config()
const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger')

const Bloglist = require('./models/bloglist')

const app = express()

app.use(cors())

app.use(express.static('build'))
app.use(express.json())



app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p> ${date} </p>`)
  })

app.get('/api/bloglist', (request, response) => {
  console.log('Trying to get collection from MongoDB')
  Bloglist
    .find({})
    .then(bloglist => {
      response.json(bloglist)
    })
    .catch((error) => {
      console.log('Cant get')
    })
    
})

app.post('/api/bloglist', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})