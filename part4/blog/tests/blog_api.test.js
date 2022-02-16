const {response} = require('express')
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
  const result = await api
    .post('/api/blogs')
    .send({ 
      title: "Balabi",
      author: "boi",
      url: "http://blablabla",
      likes: 1000000
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(currentBlog.body.length + 1)
}, 100000)

test('blog id does not contain _', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
  expect(response.body[0]._id).not.toBeDefined()
}, 100000)

test('blog updated by id', async () => {
  const blogsResult = await api.get('/api/blogs')
  const blogToChange = blogsResult.body[0]
  const id = blogToChange.id
  const oldLikes = blogToChange.likes
  await api
    .put(`/api/blogs/${id}`)
    .send({likes: oldLikes + 1})
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body[0].likes).toBe(oldLikes + 1)
}, 100000)

test('blog delete one by id', async () => {
  const currentBlog = await api.get('/api/blogs')
  
  const id = currentBlog.body[0].id

  await api.delete(`/api/blogs/${id}`)
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(currentBlog.body.length - 1)

}, 100000)


afterAll(() => {
  mongoose.connection.close()
})
