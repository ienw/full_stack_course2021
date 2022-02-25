import React, {useState} from 'react'
const Blog = ({blog}) => {
  const [view, setView] = useState(false)

  return (
    <div className="oneBlog">
      {blog.content.title} {blog.content.author}
      <button onClick={()=>{setView(!view)}}>{!view ? "view" : "hide"}</button>
      {view && (
        <>
          <div>{blog.content.title}</div>
          <div>{blog.content.author}</div>
          <div>{blog.content.url}</div>
          <div>{blog.content.likes}</div>
        </>
      )}
    </div>  
  )
}

export default Blog