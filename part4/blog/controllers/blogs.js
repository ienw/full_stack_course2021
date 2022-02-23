const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('users')
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  // decode token to find out username
  // use username to find correct user
  // const user = await User.findOne({})
  if(user) {
    blog.user = user.id
  }
  const result = await blog.save()
  response.status(201).json(result)
})


blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id

  const result = await Blog.deleteOne({ _id: blogId })
  response.status(204).end()
}) 

blogsRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id
  const result = await Blog.updateOne({ _id: blogId }, request.body)
  response.status(201).json(result)
})


module.exports = blogsRouter