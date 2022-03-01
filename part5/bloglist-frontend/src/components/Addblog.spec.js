import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Addblog from './Addblog'

test('test form', () => {
  const mockSubmit = jest.fn()
  render(<Addblog onSubmit={mockSubmit} />)

  fireEvent(
    screen.getByText('New note'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )

  fireEvent.change(
    screen.getByTestId('title'),
    { target: { value: 'boo' } }
  )
  
  fireEvent.change(
    screen.getByTestId('author'),
    { target: { value: 'Myboi' } }
  )
  
  fireEvent.change(
    screen.getByTestId('url'),
    { target: { value: 'jsabkjfb.com' } }
  )

  fireEvent(
    screen.getByText('create'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )

  expect(mockSubmit.mock.calls.length).toBe(1)
  expect(mockSubmit.mock.calls[0][0])
    .toMatchObject({ title: 'boo', author: 'Myboi', url: 'jsabkjfb.com' })
})