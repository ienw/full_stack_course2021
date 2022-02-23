require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const jwt = require('jsonwebtoken')
const User = require('./models/user')

const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  // code that extracts the token
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id) {
      const user = await User.findById(decodedToken.id)
      if (user) {
        request.user = user
        return next()
      }
    }
  }
  return response.status(401).json({ error: 'token missing or invalid' })
}

app.use(cors())
app.use(express.json())


app.use(tokenExtractor)
app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)



module.exports = app