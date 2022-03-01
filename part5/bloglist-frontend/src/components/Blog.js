import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
  const [view, setView] = useState(false)

  const handleRemove = async () => {
    await blogService.deleteBlog(blog.id)
    setBlogs(blogs => blogs.filter((item) => item.id !== blog.id))
  }

  const handleLike = async () => {
    const result = await blogService.likeBlog(blog.id, blog.content)
    console.log(result)

    blogService.getAll().then(blogs => {
      const sorting = blogs.sort((a, b) => {
        const alikes = a.content.likes || 0
        const blikes = b.content.likes || 0
        return alikes < blikes ? 1 : -1
      })

      setBlogs(sorting)
    })

  }

  return (
    <div className="oneBlog">
      {blog.content.title} {blog.content.author}
      <button onClick={() => {setView(!view)}}>{!view ? 'view' : 'hide'}</button>
      {view && (
        <>
          <div>{blog.content.title}</div>
          <div>{blog.content.author}</div>
          <div>{blog.content.url}</div>
          <div>{blog.content.likes}<button onClick={handleLike}>like</button></div>
          <div><button onClick={handleRemove}>remove</button></div>
        </>
      )}
    </div>
  )
}

export default Blog