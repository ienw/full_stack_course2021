require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
const Person = require('./models/person')
const person = require('./models/person')


morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
})


app.use(morgan(":method :url :status :response-time ms :body"))


let data = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(result => response.json(result)).catch(next)
})

app.get('/api/persons/:id', (request, response, next) => {
  
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))

})



app.get('/info', async (request, response) => {
  const allPeople = await Person.find({})
  var now = new Date();
  response.send(`Phone book has info for ${allPeople.length} people <br><br> ${now}`)
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = { ...request.body }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
  .then(updatedPerson => {
    if (updatedPerson) {
      response.json(updatedPerson)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id

  try{
    const result = await Person.deleteOne({id:id})
    response.status(204).end()
  }catch(error){
    next(error)
  }
  
})

app.post('/api/persons', async (request, response, next) => {
  const nameNnumber = { ...request.body }
  
  if (!nameNnumber.name || !nameNnumber.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  } 


  const person = new Person({
    name: nameNnumber.name,
    number: nameNnumber.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(next)

  // data.push(person)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }

  return response.status(400).json({ error: error.message })  
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})