require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Phonebook = require('./models/phonebook')

const app = express()
app.use(cors())

app.use(express.static('build'))
app.use(express.json())

morgan.token('person', (request) => {
  console.log('Trying to enhance post-request log')
  if (request.method === 'POST'){
    return (JSON.stringify(request.body))
  } else{
    return(
      null
    )
  }
})

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :person',
  ),
)


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(phonebooks => {
    response.json(phonebooks)
  })
})

app.get('/info', (request,response) => {
  const date = new Date()
  Phonebook.find({}).then((phonebooks) => {
    response.send(`<div>
     <p> Phonebook has info for ${phonebooks.length} people </p>
  <p> ${date} </p>
  </div>`)})
}
)

app.get('/api/persons/:id', (request,response,next) => {
  Phonebook.findById(request.params.id).then(entry => {
    if (entry){
      response.json(entry)
    } else{
      response.status(404).end()
    }
  })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request,response,next) => {
  const id = request.params.id
  Phonebook.findByIdAndDelete(id)
    .then(
      response.status(204).end()
    )
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request,response,next) => {
  const id = request.params.id
  const{ name, number } = request.body

  Phonebook.findByIdAndUpdate(id,{ name,number },
    { new:true, runValidators: true, context: 'query' }
  )
    .then(updatedEntry => {
      response.json(updatedEntry)
    })
    .catch(error => next(error))
} )

app.post('/api/persons', (request,response,next) => {
  const body = request.body
  if (body.name === undefined || body.number === undefined){
    return response.status(400).json({ error: 'content missing' })
  }
  const entry = new Phonebook({
    name: body.name,
    number: body.number,
  })
  console.log('New entry',entry)
  entry.save()
    .then(savedEntry => {
      response.json(savedEntry)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
app.use(errorHandler)




const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
