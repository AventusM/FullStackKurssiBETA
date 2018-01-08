import React from 'react'

const LoginForm = (props) => {
  const { handleSubmit, handleChange, username, password } = props
  return (
    <div>
      <h2>Log into application</h2>
      <form onSubmit={handleSubmit} className="loginForm">
        <div>
          username
            <input
            type="text"
            name="username" //TÄRKEÄ IFFIHÄSSÄKÄN POISTAMISEKSI
            value={username}
            onChange={handleChange} />
        </div>
        <div>
          password
            <input
            type="password"
            name="pw" //TÄRKEÄ IFFIHÄSSÄKÄN POISTAMISEKSI
            value={password}
            onChange={handleChange} />
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

export default LoginForm