import React from 'react'
import PropTypes from 'prop-types'


const Login = ({ username, password, setUsername, setPassword }) => (
  <div>
    <div>
      <label>username:</label>
      <input value={username} onChange={event => setUsername(event.target.value)}></input>
    </div>
    <div>
      <label>password:</label>
      <input value={password} onChange={event => setPassword(event.target.value)}></input>
    </div>
    <button type="submit">login</button>
  </div>
)

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}


export default Login