require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
const Person = require('./models/person')


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

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => response.json(result))
})

app.get('/api/persons/:id', (request, response) => {
  const person = data.find(p => {
      return p.id == request.params.id
  })
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})


app.get('/info', (request, response) => {
  var now = new Date();
  response.send(`Phone book has info for ${data.length} people <br><br> ${now}`)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  data = data.filter(p => p.id !== id)

  response.status(204).end()
})

app.post('/api/persons', async (request, response) => {
  const nameNnumber = { ...request.body }
  
  if (!nameNnumber.name || !nameNnumber.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  } 

  const allPeople = await Person.find({})
  if(allPeople.find((n) => n.name == nameNnumber.name)){
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = new Person({
    name: nameNnumber.name,
    number: nameNnumber.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

  // data.push(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})