import React, { useState } from 'react'
import Cookies from 'universal-cookie'

const Login = () => {
  const [password, setPassword] = useState('')

  const login = () => {
    const cookies = new Cookies()
    cookies.set('token', password, { path: '/' })
  }

  return (
    <>
      <h1>Login</h1>
      <label>
        password: <input onChange={e => setPassword(e.target.value)} type="text" />
      </label>
      <button onClick={login}>login</button>
    </>
  )
}

export default Login
