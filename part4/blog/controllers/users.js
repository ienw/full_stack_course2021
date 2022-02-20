const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (username === undefined) {
    return response.status(400).json({error: 'username missing'})
  }
  if (password === undefined) {
    return response.status(400).json({error: 'password missing'})
  }
  if (password.length < 3) {
    return response.status(400).json({error: 'password must be at least 3 characters long'})
  }

  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(password, saltRounds)

  const user = new User({
    userName: username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
  
})

module.exports = usersRouter