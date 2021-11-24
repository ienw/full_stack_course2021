const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')

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
  response.json(data)
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

app.post('/api/persons', (request, response) => {
  const person = { ...request.body }
  
  if (!person.name || !person.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  } 

  if(data.find((n) => n.name == person.name)){
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
  person.id = Math.round(Math.random()*10000000)

  data.push(person)
  response.json(data)


})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})