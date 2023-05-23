import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState({})

  async function handleSubmit(evt) {
    evt.preventDefault()

    const { data } = await axios.post('/api/login', { username, password })
    console.log(data)

    localStorage.setItem('token', data.token)
    getUserInfo(data.token)
  }

  async function getUserInfo(token) {
    const { data } = await axios.get('/api/me', {
      headers: {
        authorization: token,
      },
    })
    console.log(data)
    setUser(data)
  }

  function logout() {
    setUser({})
    localStorage.removeItem('token')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getUserInfo(token)
    }
  }, [])

  return (
    <div>
      <nav>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Login</button>
        </form>
      </nav>
      <h1>{user.username ? `Hello, ${user.username}` : 'Hello World'}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default App
