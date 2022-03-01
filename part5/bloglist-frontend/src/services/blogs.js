import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const likeBlog = (id, { title, author, url, likes }) => {
  const request = axios.put(`${baseUrl}/${id}`,{
    content: {
      title,
      author,
      url,
      likes: (likes || 0) + 1
    },
  }, {
    headers: {
      authorization: token
    }
  })
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = ({ title, author, url }) => {
  const request = axios.post(baseUrl, {
    content: {
      title,
      author,
      url,
    }
  }, {
    headers: {
      authorization: token
    }
  })
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, setToken, createBlog, likeBlog, deleteBlog }