const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('users')
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  
  blog.user = request.user.id
  const result = await blog.save()
  response.status(201).json(result)
})


blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  const result = await Blog.deleteOne({ _id: blogId, user: request.user })
  response.status(204).end()
}) 

blogsRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id
  const result = await Blog.updateOne({ _id: blogId }, request.body)
  response.status(201).json(result)
})


module.exports = blogsRouter