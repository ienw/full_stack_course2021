import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blog', () => {
  const blog = {
    content: {
      title: 'Component testing is done with react-testing-library',
      author: 'bonobi',
      url: 'blabla.com',
      likes: 201
    }
  }

  render(<Blog blog={blog} />)

  expect(screen.getByText(blog.content.title)).toBeDefined()
  expect(screen.getByText(blog.content.author)).toBeDefined()

  expect(screen.queryByText(blog.content.url)).toBe(null)
  expect(screen.queryByText(blog.content.likes)).toBe(null)
})


test('renders blog details', () => {
  const blog = {
    content: {
      title: 'Component testing is done with react-testing-library',
      author: 'bonobi',
      url: 'blabla.com',
      likes: 201
    }
  }

  render(<Blog blog={blog} />)

  expect(screen.getByText(blog.content.title)).toBeDefined()
  expect(screen.getByText(blog.content.author)).toBeDefined()

  fireEvent(
    screen.getByText('view'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )

  expect(screen.queryByText(blog.content.url)).toBeDefined()
  expect(screen.queryByText(blog.content.likes)).toBeDefined()
})


test('test like button', () => {
  const blog = {
    content: {
      title: 'Component testing is done with react-testing-library',
      author: 'bonobi',
      url: 'blabla.com',
      likes: 201
    }
  }

  const setBlogs = jest.fn()
  const handleLike = jest.fn()
  render(<Blog blog={blog} setBlogs={setBlogs} handleLike={handleLike} />)

  expect(screen.getByText(blog.content.title)).toBeDefined()
  expect(screen.getByText(blog.content.author)).toBeDefined()

  fireEvent(
    screen.getByText('view'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )

  fireEvent(
    screen.getByText('like'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )

  fireEvent(
    screen.getByText('like'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )

  expect(handleLike.mock.calls.length).toBe(2)
})