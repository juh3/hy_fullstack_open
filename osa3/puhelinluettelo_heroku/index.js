const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()
app.use(cors())

app.use(express.static('build'))

let persons = [
  { id:1,
  name: "Arto Hellas",
number: "040-12356"},

  { id:2,
  name: "Ada Lovelace",
number: "39-44-5323523"},

  {id:3,
  name: "Dan Abramov",
number: "12-43-234345"},

  {id:4,
  name: "Mary Poppendick",
number: "39-23-6423122"}
]

app.use(express.json())

morgan.token('person', (request) => {
  console.log("Trying to enhance post-request log")
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
  response.json(persons)
})

app.get('/info', (request,response) => {
  const date = new Date()
  const amt_of_persons = Object.keys(persons).length
  response.send(`<p>Phonebook has info for ${amt_of_persons} people </p> <p>${date} </p>`)
}
)

app.get('/api/persons/:id', (request,response) => {
  const id = Number(request.params.id)
  const person = persons.find(note => note.id === id)
  if (person){
    response.json(person)
  } else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request,response) =>{
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateId = () => (
  Math.floor(Math.random()*(10000-10)+10)
)

app.post('/api/persons', (request,response) =>{
  const body = request.body
  if (!body.name){
    return response.status(400).json({
      error: 'Name is missing'
    })
  }
  if (!body.number){
    return response.status(400).json({
      error: 'Number is missing'
    })
  }
  console.log(body.name)
  console.log(persons.some(person => person.name === body.name))
  if (persons.some(person => person.name === body.name)){
    return response.status(400).json({
      error: 'Name is already in the phonebook, name must be unique'
    })
  }

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)
  

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }
  persons = persons.concat(person)
  response.json(person)
  }
)




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
