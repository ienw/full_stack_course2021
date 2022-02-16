const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('blogs is increased by one', async () => {
  const currentBlog = await api.get('/api/blogs')
  await api
    .post('/api/blogs')
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(currentBlog.body.length + 1)
}, 100000)

test('blog id does not contain _', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
  expect(response.body[0]._id).not.toBeDefined()
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})
