import React, { useState } from 'react';
import { loginUser } from '../api';

const Login = ({ setToken, navigate, setLoginErrorMessage, loginErrorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async () => {

    const results = await loginUser(username, password);

    if (results.token) {
      setToken(results.token);
      window.localStorage.setItem('token', results.token);
      window.localStorage.setItem('username', username)
      console.log(results.message)
      navigate('/');
    } else {
      console.log("Login Error")
      setLoginErrorMessage(results.message)
      console.log(loginErrorMessage)
    }
  }
  
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      handleSubmit();
    }}>

      <h1>Login to Fitness Tracker</h1>
      <div>{`${loginErrorMessage}`}</div>
      <input 
        type='text'
        placeholder='Enter Username'
        onChange={(event) => setUsername(event.target.value)}
      />
      <input 
        type='password'
        placeholder='Enter Password'
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default Login;