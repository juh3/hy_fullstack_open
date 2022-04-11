require('dotenv').config()
const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
const Bloglist = require('./models/bloglist')

logger.info('connecting to', config.MONGODB_URI)

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)
.then(result => {
  logger.info('connected to MongoDB')
})
.catch((error) => {
  logger.error('error connecting to MongoDB:', error.message)
})

const app = express()

app.use(cors())

app.use(express.static('build'))
app.use(express.json())
const notesRouter = require('./controllers/notes')
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app