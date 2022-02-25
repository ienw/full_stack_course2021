import React, { useState } from 'react'

const Addblog =  ({ onSubmit }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  return (
    <div>
      <h1>create New</h1>
      <div>
        <label>title:</label>
        <input value={title} onChange={e => setTitle(e.target.value)}></input>
      </div>
      <div>
        <label>author:</label>
        <input value={author} onChange={e => setAuthor(e.target.value)}></input>
      </div>
      <div>
        <label>url:</label>
        <input value={url} onChange={e => setUrl(e.target.value)}></input>
      </div>
      <button onClick={() => onSubmit({ title, author, url })}>create</button>
    </div>
  )
}

export default Addblog