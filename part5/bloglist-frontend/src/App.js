import React, { useState, useEffect } from 'react'
import Addblog from './components/Addblog'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {

      const sorting = blogs.sort((a, b) => {
        const alikes = a.content.likes || 0
        const blikes = b.content.likes || 0
        return alikes < blikes ? 1 : -1
      })

      setBlogs(sorting)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])




  const handleCreate = async ({ title, author, url, onFinish }) => {
    console.log(title, author, url)
    const result = await blogService.createBlog({ author, title, url })
    setBlogs([...blogs, result])
    console.log(result)
    setSuccessMessage(`a new blog ${title} has been created! by ${author} added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    onFinish()
  }

  const handleLike = async (blog) => {
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

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleClicked = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user) {
    return (
      <div>
        <h1>Blogs</h1>
        {successMessage && <div className="success">{successMessage}</div>}
        {user.name} logged in
        <Addblog onSubmit={handleCreate} />
        {(blogs || []).map(blog =>
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} handleLike={handleLike}/>
        )}
        <Logout onSubmit={handleLogout}/>
      </div>
    )
  }

  return (
    <form onSubmit={handleClicked}>
      <h2>log in to application</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <Login
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </form>
  )
}

export default App