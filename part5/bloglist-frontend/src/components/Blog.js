import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, handleLike }) => {
  const [view, setView] = useState(false)

  const handleRemove = async () => {
    await blogService.deleteBlog(blog.id)
    setBlogs(blogs => blogs.filter((item) => item.id !== blog.id))
  }

  return (
    <div className="oneBlog">
      <span>{blog.content.title}</span>
      {' '}
      <span>{blog.content.author}</span>
      <button onClick={() => {setView(!view)}}>{!view ? 'view' : 'hide'}</button>
      {view && (
        <>
          <div>{blog.content.title}</div>
          <div>{blog.content.author}</div>
          <div>{blog.content.url}</div>
          <div>{blog.content.likes}<button onClick={() => handleLike(blog)}>like</button></div>
          <div><button onClick={handleRemove}>remove</button></div>
        </>
      )}
    </div>
  )
}

export default Blog