import React from 'react'
const Blog = ({blog}) => (
  <div>
    {blog.content.title} {blog.content.author}
  </div>  
)

export default Blog