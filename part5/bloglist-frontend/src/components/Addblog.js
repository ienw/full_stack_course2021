import React, { useState } from 'react'

const Addblog =  ({ onSubmit }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [click, setClick] = useState(true)

  if (click) {
    return (
      <div>
        <button onClick={()=>setClick(false)}>New note</button>
      </div>
    )
  }

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
      <button
        onClick={() =>
          onSubmit({ title, author, url, onFinish: () => setClick(true) })
        }>
          create
        </button>
      <div>
      <button
        onClick={() => setClick(true)}>cancel</button>
      </div>
    </div>
  )
}

export default Addblog