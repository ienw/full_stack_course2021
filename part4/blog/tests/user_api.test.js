const bcryptjs = require('bcryptjs')
const {response} = require('express')
const User = require('../models/user')

test('a user is created successfully', async () => {
  const newUser = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'salainen',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  expect(result.body.username).toBe(newUser.username)
})